const pool = require('../config/db');  // Import the database connection

// SQL command to create roles table
const createRolesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS roles (
            role_id SERIAL PRIMARY KEY,          // Changed to role_id for clarity
            role_name VARCHAR(255) UNIQUE NOT NULL
        );
    `;

    try {
        await pool.query(query);
        console.log("Roles table created successfully.");  // Log success message
    } catch (err) {
        console.error("Error creating roles table:", err);  // Log error if it occurs
    } finally {
        pool.end();  // Close the database connection
    }
};

// Execute the function to create the roles table
createRolesTable();
