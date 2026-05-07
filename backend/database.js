const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        name TEXT,
        email TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lecturer_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS section_students (
        section_id INTEGER,
        student_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        expected_output TEXT,
        lecturer_id INTEGER,
        section_id INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        student_id INTEGER,
        code TEXT,
        status TEXT,
        grade INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS feedbacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        message TEXT,
        date TEXT
    )`);

    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (!err && row.count === 0) {
            const bcrypt = require('bcryptjs');
            const hash = bcrypt.hashSync('admin123', 8);
            db.run('INSERT INTO users (username, password, role, name, email) VALUES (?, ?, ?, ?, ?)',
                ['admin', hash, 'admin', 'System Administrator', 'admin@example.com']
            );
        }
    });
});

module.exports = db;
