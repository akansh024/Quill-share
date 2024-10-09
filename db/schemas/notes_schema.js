const pool = require('../config/db');  // Import the PostgreSQL connection

// SQL command to create notes table
const createNotesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS notes (
            note_id SERIAL PRIMARY KEY,         // Changed to note_id for clarity
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);  // Execute the SQL command
        console.log('Notes table created successfully');  // Success log message
    } catch (error) {
        console.error('Error creating notes table:', error);  // Error log message
    } finally {
        pool.end();  // Close the database connection
    }
};

// Execute the function to create the notes table
createNotesTable();
