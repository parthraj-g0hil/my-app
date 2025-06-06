const express = require('express');
const mysql = require('mysql2/promise'); // use promise version
const cors = require('cors');

const app = express();

// Enable CORS for all origins (customize if needed)
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Create a MySQL connection pool for better performance
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function for logging with timestamp
const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);

// Root route - returns current DB time in JSON
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS time');
    res.json({ dbTime: rows[0].time });
  } catch (error) {
    log(`DB query error: ${error.message}`);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Example API endpoint returning a friendly message
app.get('/welcome', (req, res) => {
  res.json({ message: '👋 Welcome to Parthraj’s awesome Node.js app!' });
});

// Start server
app.listen(PORT, () => {
  log(`🚀 Server listening on port ${PORT}`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  log('Server shutting down...');
  pool.end().then(() => {
    log('Database pool closed');
    process.exit(0);
  });
});
