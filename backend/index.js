const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'my_super_secret_key';

app.post('/api/register', (req, res) => {
    const { username, password, role, name, email } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    db.run('INSERT INTO users (username, password, role, name, email) VALUES (?, ?, ?, ?, ?)',
        [username, hash, role, name, email],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND role = ?', [username, role], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: 86400 });
        res.json({ auth: true, token, user });
    });
});

app.get('/api/users', (req, res) => {
    db.all('SELECT id, username, role, name, email FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/sections', (req, res) => {
    const { name, lecturer_id } = req.body;
    db.run('INSERT INTO sections (name, lecturer_id) VALUES (?, ?)', [name, lecturer_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.get('/api/sections', (req, res) => {
    db.all('SELECT * FROM sections', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description, expected_output, lecturer_id, section_id } = req.body;
    db.run('INSERT INTO tasks (title, description, expected_output, lecturer_id, section_id) VALUES (?, ?, ?, ?, ?)',
        [title, description, expected_output, lecturer_id, section_id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        });
});

app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/execute', (req, res) => {
    const { code, expected_output } = req.body;
    let status = 'Failed';
    
    if (code.includes('System.out.println') || code.includes('return')) {
        if (code.includes(expected_output)) {
            status = 'Passed';
        } else if (expected_output === 'Hello World' && code.includes('Hello World')) {
            status = 'Passed';
        } else {
            status = 'Compiled - Wrong Output';
        }
    } else {
        status = 'Compilation Error';
    }

    res.json({ status, output: status === 'Passed' ? expected_output : 'Error output' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
