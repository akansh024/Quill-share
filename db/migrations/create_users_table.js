const pool = require('../config/db');  // Import the database connection

// SQL command to create users table
const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,           // Changed to user_id for clarity
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(query);
        console.log("Users table created successfully.");  // Log success message
    } catch (err) {
        console.error("Error creating users table:", err);  // Log error if it occurs
    } finally {
        pool.end();  // Close the database connection
    }
};

// Execute the function to create the users table
createUsersTable();
