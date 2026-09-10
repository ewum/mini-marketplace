const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middlewares/authmiddleware');

router.get('/orders', authMiddleware, (req, res) => {
    db.query(
        'SELECT id, buyer_id, product_id, quantity, created_at, status, total FROM orders WHERE buyer_id = ?',
        [req.user.id],
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});
            if (results.length == 0) return res.status(404).json({error: 'user not found'});
            res.json(results[0]);
        }
    )
})

module.exports = router;