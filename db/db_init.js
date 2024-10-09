const pool = require('../config/db'); // Import the pool object to manage database connections

// Function to initialize the database
async function initDatabase() {
    try {
        // SQL command to create users table
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,          // Changed to user_id for clarity
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // SQL command to create notes table
        const createNotesTable = `
            CREATE TABLE IF NOT EXISTS notes (
                note_id SERIAL PRIMARY KEY,          // Changed to note_id for clarity
                user_id INTEGER REFERENCES users(user_id),
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // SQL command to create comments table
        const createCommentsTable = `
            CREATE TABLE IF NOT EXISTS comments (
                comment_id SERIAL PRIMARY KEY,
                note_id INT REFERENCES notes(note_id) ON DELETE CASCADE,
                user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
                comment_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // SQL command to create roles table
        const createRolesTable = `
            CREATE TABLE IF NOT EXISTS roles (
                role_id SERIAL PRIMARY KEY,
                role_name VARCHAR(50) UNIQUE NOT NULL
            );
        `;

        // Execute the SQL commands
        await pool.query(createUsersTable);
        console.log('Users table created successfully.');

        await pool.query(createNotesTable);
        console.log('Notes table created successfully.');

        await pool.query(createCommentsTable);
        console.log('Comments table created successfully.');

        await pool.query(createRolesTable);
        console.log('Roles table created successfully.');

        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        pool.end(); // Close the database connection
    }
}

// Call the function to run the initialization
initDatabase();
