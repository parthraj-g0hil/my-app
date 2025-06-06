const express = require('express');
const mysql = require('mysql2');
const app = express();

// Use environment variables directly from ECS
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Create DB connection
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

// Root route
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Node.js running on port ${PORT}`);
});
