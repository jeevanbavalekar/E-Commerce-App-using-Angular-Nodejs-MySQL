const express = require('express');
const router = express.Router();
const connection = require('../connection');

// Get all products
router.get('/', (req, res) => {
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get product by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

// Add a new product
router.post('/', (req, res) => {
    const { name, price, category, color, image, description } = req.body;
    const sql = 'INSERT INTO products (name, price, category, color, image, description) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(sql, [name, price, category, color, image, description], (err, result) => {
        if (err) return res.status(500).send({ error: 'Failed to add product', details: err });
        res.status(201).send({ message: 'Product added successfully', result });
    });
});

// Update a product
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, category, color, image, description } = req.body;
    connection.query(
        'UPDATE products SET name = ?, price = ?, category = ?, color = ?, image = ?, description = ? WHERE id = ?',
        [name, price, category, color, image, description, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.json({ id, ...req.body });
        }
    );
});

// Delete a product
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if (isNaN(id)) return res.status(400).send({ error: 'Invalid product ID' });

    connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send({ error: 'Failed to delete product' });
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Product not found' });
        res.send({ message: 'Product deleted successfully' });
    });
});

router.get('/test-products', (req, res) => {
    const query = 'samsung'; // Hardcoded value
    const sql = 'SELECT * FROM ecommerce.products WHERE name LIKE ?';

    console.log('Executing SQL:', sql, [`%${query}%`]); // Log the SQL and parameters

    db.query(sql, [`%${query}%`], (error, results) => {
        if (error) {
            console.error('SQL error:', error);
            return res.status(500).send(error);
        }
        console.log('Query results:', results); // Log results
        res.send(results);
    });
});



module.exports = router;
