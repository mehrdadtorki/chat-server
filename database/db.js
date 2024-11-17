const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Initialize database connection
const dbPath = path.resolve(__dirname, "messages.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Run the schema initialization
const schema = fs.readFileSync(path.resolve(__dirname, "schema.sql"), "utf8");
db.exec(schema, (err) => {
  if (err) {
    console.error("Failed to initialize database schema:", err.message);
  } else {
    console.log("Database schema initialized.");
  }
});

module.exports = db;
