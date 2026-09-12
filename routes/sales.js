const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middlewares/authmiddleware');

router.get('/', authMiddleware, (req, res) => {
	db.query(
		`SELECT o.*, p.seller_id
		FROM orders o
		JOIN products p ON o.product_id = p.id
		WHERE p.seller_id = ?`,
		[req.user.id],
		(err, results) => {
			if (err) return res.status(500).json({error: err.message});
			if (results.length == 0) return res.status(404).json({'no sales found'});
			res.json(results);
		}
	)
})

router.get('/:order_id', authMiddleware, (req, res) => {
	const {order_id} = req.params;
	db.query(
		`SELECT o.*, p.seller_id
		FROM orders o
		JOIN products p ON o.product_id = p.id
		WHERE o.id = ? AND p.seller_id = ?`,
		[order_id, req.user.id],
		(err, results) => {
			if (err) return res.status(500).json({error: err.message});
			if (results.length == 0) return res.status(404).json({'no sale found'});
			res.json(results[0]);
		}
		)
})

module.exports = router;