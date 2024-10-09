const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'database-1.cpikm84q2imr.us-east-1.rds.amazonaws.com',
    database: 'quillshare',
    password: 'b8nb3IVTpfBqEL0oyLB4 ',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('PostgreSQL connection failed:', err);
    } else {
        console.log('Connected to PostgreSQL');
    }
});

module.exports = pool;