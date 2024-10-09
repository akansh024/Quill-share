const pool = require('../config/db');  // Import the database connection

// SQL command to create notes table
const createNotesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS notes (
            note_id SERIAL PRIMARY KEY,           // Changed to note_id for clarity
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log("Notes table created successfully.");  // Log message on success
    } catch (err) {
        console.error("Error creating notes table:", err);  // Log error if it occurs
    } finally {
        pool.end();  // Close the database connection
    }
};

// Execute the function to create the notes table
createNotesTable();
