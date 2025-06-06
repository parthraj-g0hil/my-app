// Load .env variables
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = process.env.PORT || 3000;

// Create MySQL connection using .env values
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Try to connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1); // Exit if DB fails to connect
  }
  console.log('✅ Connected to MySQL');
});

// Main route
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) return res.status(500).send('DB query failed');
    res.send(`📅 DB Time: ${results[0].time}`);
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Node.js running on port ${PORT}`);
});
