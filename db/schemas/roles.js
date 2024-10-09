const pool = require('../config/db');  // Import the PostgreSQL connection

// SQL command to create roles table
const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles (
        role_id SERIAL PRIMARY KEY,
        role_name VARCHAR(50) UNIQUE NOT NULL
    );
`;

// SQL command to insert default roles
const insertRoles = `
    INSERT INTO roles (role_name) 
    VALUES 
        ('admin'), 
        ('editor'), 
        ('viewer') 
    ON CONFLICT (role_name) DO NOTHING;  // Prevent duplicate insertions
`;

// Function to create roles table and insert default roles
const createRoles = async () => {
    try {
        // Create the roles table
        await pool.query(createRolesTable);
        console.log('Roles table created successfully');

        // Insert default roles
        await pool.query(insertRoles);
        console.log('Default roles inserted successfully');
    } catch (error) {
        console.error('Error creating roles table or inserting roles:', error);
    } finally {
        pool.end(); // Close the connection
    }
};

// Execute the function to create roles
createRoles();
