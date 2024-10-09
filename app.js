const express = require('express');
const pool = require('./config/db');  // PostgreSQL connection
const authRoutes = require('./routes/auth');  // User authentication routes
const path = require('path');
const multer = require('multer');
const AWS = require('@aws-sdk/client-s3');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const auth = require('./middleware/auth');  // Import the auth middleware
require('dotenv').config();  // Load environment variables

const app = express();

// Init middleware
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);  // Auth routes for register/login

// Serve static folder (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up storage destination and file naming for multer
const storage = multer.diskStorage({
    destination: './uploads',  // Folder to store uploads
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Filename with timestamp
    }
});

// Init multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }  // Set file size limit
}).single('file');  // Single file upload

// AWS S3 Client configuration (v3)
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = new S3Client({ region: 'us-east-1' });

// S3 Upload File Function
const uploadFile = async (fileName, fileContent) => {
    const params = {
        Bucket: 'krmuquillshare',  // Your S3 bucket name
        Key: fileName,  // File name in the bucket
        Body: fileContent  // File content
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log('File uploaded successfully!', data);
    } catch (err) {
        console.log('Error uploading file:', err);
    }
};

// Upload route (instead of router.post, use app.post since we're in app.js)
app.post('/upload', auth, upload, async (req, res) => {
    if (req.file === undefined) {
        return res.status(400).send('No file selected');
    }
    // Upload to S3
    await uploadFile(req.file.filename, req.file.buffer);
    res.send(`File uploaded: ${req.file.filename}`);
});

// Cognito User Pool configuration
const poolData = {
    UserPoolId: 'ap-southeast-2_iuNUgBsKz',  // Your User Pool ID
    ClientId: '4tn3846mkus74pjec3ig978d8l',  // Your Client ID
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Cognito Signup Function
const signUp = (email, password) => {
    const attributeList = [];
    const dataEmail = {
        Name: 'email',
        Value: email,
    };
    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('User registration successful:', result);
    });
};

// Example of a protected route
app.get('/private', auth, (req, res) => {
    res.send('This is a private route, only accessible with a valid token');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
