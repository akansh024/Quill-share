const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For creating JWT tokens
const pool = require('../config/db');  // PostgreSQL connection
const auth = require('../middleware/auth');  // Adjust the path to import the auth middleware
const multer = require('multer');

// Initialize multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',  // Folder to store uploads
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Filename with timestamp
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }  // Set file size limit
}).single('file');  // Single file upload



// User registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = 'INSERT INTO users (email, password) VALUES ($1, $2)';
        await pool.query(query, [email, hashedPassword]); // Use the hashed password
        res.send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const user = await pool.query(userQuery, [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and send a token
        const token = jwt.sign({ user: { id: user.rows[0].id } }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server error');
    }
});

// File upload route
router.post('/upload', auth, upload, async (req, res) => {
    if (req.file === undefined) {
        return res.status(400).send('No file selected');
    }

    // Upload file to S3
    await uploadFile(req.file.filename, req.file.buffer);
    res.send(`File uploaded: ${req.file.filename}`);
});

module.exports = router;