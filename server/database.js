const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database (or open it if it already exists)
const db = new sqlite3.Database('./database.db');

// Create a table for registered users
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS registered_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone_number TEXT NOT NULL UNIQUE,
      reg_no TEXT NOT NULL UNIQUE,
      email_address TEXT NOT NULL UNIQUE,
      faculty TEXT NOT NULL,
      hall_of_residence TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
