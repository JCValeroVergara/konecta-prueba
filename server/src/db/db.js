require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to database');
        client.release();
    } catch (error) {
        console.error('Error connecting to database', error.message);
    }
};

module.exports = {connectDB, pool};