const express = require('express');
const router = express.Router();
const db = require('../connection');  // Import the connection

// API endpoint for sign-up
router.post('/seller-signup', (req, res) => {
    const { name, email, password } = req.body;
    const query = `INSERT INTO sellers (name, email, password) VALUES (?, ?, ?)`;
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ id: result.insertId, name, email });
    });
});

// API endpoint for login
router.post('/seller-login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM sellers WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    });
});

module.exports = router;
