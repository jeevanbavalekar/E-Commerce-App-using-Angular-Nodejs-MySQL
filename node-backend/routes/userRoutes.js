const express = require('express');
const connection = require('../connection');
const router = express.Router();

// User Sign-Up
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    connection.query(query, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to sign up", err });
        }
        res.status(201).json({ id: result.insertId, name, email });
    });
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Login failed", err });
        }
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

module.exports = router;
