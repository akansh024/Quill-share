const pool = require('../config/db');  // Import the PostgreSQL connection

// SQL command to create comments table
const createCommentsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comments (
            comment_id SERIAL PRIMARY KEY,
            note_id INT REFERENCES notes(note_id) ON DELETE CASCADE,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            comment_text TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);  // Execute the SQL command
        console.log('Comments table created successfully');  // Success log message
    } catch (err) {
        console.error('Error creating comments table:', err);  // Error log message
    } finally {
        pool.end();  // Close the connection
    }
};

// Execute the function to create the comments table
createCommentsTable();
