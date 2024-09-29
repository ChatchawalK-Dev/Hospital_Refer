const express = require('express');
const router = express.Router();
const pool = require('./dbAddress');

router.get('/', (req, res) => {
    pool.query(`
    SELECT
        tp.*,
        CASE
            WHEN tp.geography_id = 1 THEN 'ภาคเหนือ'
            WHEN tp.geography_id = 2 THEN 'ภาคกลาง'
            WHEN tp.geography_id = 3 THEN 'ภาคตะวันออกเฉียงเหนือ'
            WHEN tp.geography_id = 4 THEN 'ภาคตะวันตก'
            WHEN tp.geography_id = 5 THEN 'ภาคตะวันออก'
            WHEN tp.geography_id = 6 THEN 'ภาคใต้'
            ELSE 'Unknown' -- หากไม่ตรงกับเงื่อนไขใดๆ
        END AS region
    FROM 
        thai_provinces tp`, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.get('/thaiAmphures/:province_id', (req, res) => {
    const { province_id } = req.params;
    pool.query(`
    SELECT * FROM thai_amphures
    WHERE province_id = ?;`, [province_id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});


module.exports = router;
