const express = require('express');
const db = require('../db');

router = express.Router();

router.get('/questions', (req, res) => {
    const {product_id} = req.params;
    db.query(
        'SELECT id, asker_id, product_id, question, answer, created_at, answered_at FROM product_questions WHERE product_id = ?',
        [product_id],
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});
            res.json(results);
        }
    )
})

module.exports = router;  