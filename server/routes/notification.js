const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    const { hospcode } = req.query;
    
    let sql = `
    SELECT
        p.hn AS HN,
        p.patient_cid AS CID,
        CONCAT(p.patient_title_nameth, '.', p.patient_nameth, ' ', p.patient_last_nameth) AS fullNameTH,
        CONCAT(p.patient_title_nameen, '.', p.patient_nameen, ' ', p.patient_last_nameen) AS fullNameEN,
        p.status AS status,
        rp.emergency AS emergency,
        rp.idreferout_popup AS idreferout_popup,
        rp.date_refer AS date_refer,
        rp.time_refer AS time_refer
    FROM
        personal_patient p
    LEFT JOIN
        referout_popup rp ON p.idreferout_popup = rp.idreferout_popup
    WHERE
        refer_in = 1 AND refer_out = 0`;

    const values = [];

    if (hospcode && hospcode !== '50000') {
        sql += ' AND p.hospcode = ?';
        values.push(hospcode);
    }

    sql += `
    ORDER BY
        p.idpersonal_patient DESC
    LIMIT 5`;

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
