const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    const { hospcode } = req.query;

    let sql = `
    SELECT 
        rp.emergency AS Triage,
        CONCAT(p.patient_title_nameth, '.', p.patient_nameth, ' ', p.patient_last_nameth) AS fullNameTH,
        rp.idreferout_popup AS RefID,
        p.hn AS HN,
        rp.date_refer AS Date_ReferOut,
        rp.time_refer AS Time_ReferOut,
        p.status AS Status,
        rp.hosp_destination AS Hosp_Destination,
        p.date_referin AS Date_ReferIn,
        p.time_referin AS Time_ReferIn,
        rp.warddisch AS WaedDisch
    FROM
        personal_patient p
    JOIN
        referout_popup rp ON p.idreferout_popup = rp.idreferout_popup
    WHERE
        p.refer_out = 1`;

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
