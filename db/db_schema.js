const pool = require('../config/db'); // Import the pool object to manage database connections
const createRolesTable = require('./schemas/roles');  // Import the function to create roles table
const createCommentsTable = require('./schemas/comments_schema');  // Import the function to create comments table

// Function to create schemas and tables
async function createSchemas() {
    try {
        // SQL commands to create schemas
        const createUsersSchema = `
            CREATE SCHEMA IF NOT EXISTS users_schema;
        `;

        const createNotesSchema = `
            CREATE SCHEMA IF NOT EXISTS notes_schema;
        `;

        const createCommentsSchema = `
            CREATE SCHEMA IF NOT EXISTS comments_schema;
        `;

        const createRolesSchema = `
            CREATE SCHEMA IF NOT EXISTS roles_schema;
        `;

        // Execute the SQL commands to create schemas
        await pool.query(createUsersSchema);
        console.log('Users schema created successfully.');

        await pool.query(createNotesSchema);
        console.log('Notes schema created successfully.');

        await pool.query(createCommentsSchema);
        console.log('Comments schema created successfully.');

        await pool.query(createRolesSchema);
        console.log('Roles schema created successfully.');

        // Now create the tables in the appropriate schemas
        await createRolesTable();  // Call the function to create the roles table
        await createCommentsTable();  // Call the function to create the comments table

        console.log('All schemas and tables created successfully!');
    } catch (error) {
        console.error('Error creating schemas or tables:', error);
    } finally {
        pool.end(); // Close the database connection
    }
}

// Call the function to run the schema and table creation
createSchemas();
