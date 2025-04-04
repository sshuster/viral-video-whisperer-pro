
-- Drop tables if they exist
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create videos table
CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    url TEXT NOT NULL,
    platform TEXT NOT NULL,
    description TEXT,
    timestamp TEXT NOT NULL,
    suggestions TEXT NOT NULL,  -- JSON string of suggestions
    metrics TEXT NOT NULL,      -- JSON string of metrics
    FOREIGN KEY (user_id) REFERENCES users (id)
);
