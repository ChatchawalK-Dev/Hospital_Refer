const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    const { hospcode } = req.query;

    let sql = `
    SELECT 
        rp.emergency AS Triage,
        CONCAT(p.patient_title_nameth, '.', p.patient_nameth, ' ', p.patient_last_nameth) AS fullName,
        rp.idreferout_popup AS RefID,
        p.hn  AS HN,
        h.congenital_disease AS Disease,
        rp.warddisch AS Department,
        rp.date_refer AS Date_ReferOut,
        rp.time_refer AS Time_ReferOut,
        p.status AS Status,
        p.hospcode AS HospCode,
        rp.hosp_origin AS HospOrigin
    FROM
        personal_patient p
    JOIN
        health_history h ON p.idhealth_history = h.idhealth_history
    JOIN
        referout_popup rp ON p.idreferout_popup = rp.idreferout_popup
    WHERE
        p.refer_in = 1`;

    const values = [];

    if (hospcode !== '50000') {
        sql += ' AND hospcode = ?';
        values.push(hospcode);
    }

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
