const express = require('express');
const router = express.Router();
const db = require('../connection');

router.post('/', (req, res) => {
    const order = req.body;
    const sql = 'INSERT INTO ecommerce.orders (email, address, contact, totalPrice, userId) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [order.email, order.address, order.contact, order.totalPrice, order.userId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, ...order });
    });
});


router.get('/orders', (req, res) => {
    const userId = req.query.userId;
    const sql = 'SELECT * FROM ecommerce.orders WHERE userId = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

router.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const sql = 'DELETE FROM ecommerce.orders WHERE id = ?';
    db.query(sql, [orderId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
});


module.exports = router;
