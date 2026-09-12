const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:product_id', (req, res) => {
    const {product_id} = req.params;
    db.query(
        'SELECT * FROM product_questions WHERE product_id = ?',
        [product_id],
        (err, results) => {
            if (err) return res.status(500).json({error: err.message});
            if (results.length == 0) return.res.status(404).json({error: 'questions not found'});
            res.json(results);
        }
    )
})

module.exports = router;