const pool = require('../config/db');  // Import the database connection

// Create comments table with appropriate fields and constraints
const createCommentsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS comments (
            comment_id SERIAL PRIMARY KEY,    -- Changed to comment_id for clarity
            note_id INT REFERENCES notes(note_id) ON DELETE CASCADE,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log("Comments table created successfully.");
    } catch (err) {
        console.error("Error creating comments table:", err);
    } finally {
        pool.end();  // Close the connection to free up resources
    }
};

// Run the function to create the comments table
createCommentsTable();
