CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt TEXT NOT NULL
  -- status TEXT NOT NULL
);

-- Create the Messages table
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversationId INTEGER NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  -- status TEXT NOT NULL DEFAULT 'sent', -- sent, delivered, read
  createdAt TEXT NOT NULL,
  FOREIGN KEY (conversationId) REFERENCES conversations(id)
);

-- Create the user Table

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOt NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  profileImage TEXT
)

