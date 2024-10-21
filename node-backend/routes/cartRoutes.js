const express = require('express');
const connection = require('../connection');
const router = express.Router();

// Add item to cart
router.post('/add', (req, res) => {
    const { productId, userId, quantity, name, price, category, color, description, image } = req.body;

    // Validate inputs
    if (!productId || !userId || quantity === undefined || !name || !price || !category || !color || !description || !image) {
        return res.status(400).json({ message: 'All fields are required: Product ID, User ID, Quantity, Name, Price, Category, Color, Description, and Image' });
    }


    const query = `INSERT INTO ecommerce.cart (productId, userId, quantity, name, price, category, color, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(query, [productId, userId, quantity, name, price, category, color, description, image], (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the database error
            return res.status(500).json({ message: "Failed to add to cart", error: err });
        }
        res.status(201).json({ success: true, id: result.insertId, productId, userId });
    });
});


// Get user cart
router.get('', (req, res) => {
    const userId = req.query.userId; // Get the user ID from query params
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = `SELECT * FROM ecommerce.cart WHERE userId = ?`; // SQL query to get cart items
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({ success: true, data: results }); // Return the results
    });
});


// Delete item from cart based on productId and userId
router.delete('/:productId/:userId', (req, res) => {
    const { productId, userId } = req.params;

    if (!productId || !userId) {
        return res.status(400).json({ message: 'Product ID and User ID are required' });
    }

    const query = `DELETE FROM ecommerce.cart WHERE productId = ? AND userId = ?`; // Delete based on productId and userId
    connection.query(query, [productId, userId], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ success: true, message: 'Item removed from cart' });
    });
});


module.exports = router;
