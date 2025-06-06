const express = require('express');
const mysql = require('mysql2');
const app = express();

const PORT = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

app.get('/', (req, res) => {
  db.query('SELECT NOW() AS time', (err, results) => {
    if (err) return res.status(500).send('DB query failed');
    res.send(`📅 DB Time: ${results[0].time}`);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Node.js running on port ${PORT}`);
});
