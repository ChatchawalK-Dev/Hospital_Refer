const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/referout/:year', (req, res) => {
    const { year } = req.params;
    const { hospcode } = req.query;

    let sql = `
    SELECT 
            YEAR(date_refer) AS year,
            MONTH(date_refer) AS month,
            date_refer,
            hospcode,
            refer_out,
            status,
            COUNT(idpersonal_patient) AS count
        FROM 
            Refer
        WHERE
            YEAR(date_refer) = ?
    `;

    const values = [year];

    if (hospcode !== '50000') { //hospcode 50000 check admin
        sql += ' AND hospcode = ?';
        values.push(hospcode);
    }

    sql += `
    GROUP BY 
        MONTH(date_refer),
        YEAR(date_refer)
    ORDER BY 
        YEAR(date_refer),
        MONTH(date_refer);
    `;

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.get('/referin/:year', (req, res) => {
    const { year } = req.params;
    const { hospcode } = req.query;

    let sql = `
    SELECT 
            YEAR(date_referin) AS year,
            MONTH(date_referin) AS month,
            date_referin,
            hospcode,
            refer_in,
            status,
            COUNT(idpersonal_patient) AS count
        FROM 
            Refer
        WHERE
            YEAR(date_referin) = ?
    `;

    const values = [year];

    if (hospcode !== '50000') {
        sql += ' AND hospcode = ?';
        values.push(hospcode);
    }

    sql += `
    GROUP BY 
        MONTH(date_referin),
        YEAR(date_referin)
    ORDER BY 
        YEAR(date_referin),
        MONTH(date_referin);
    `;

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.get('/referin1/card', (req, res) => {
    const { hospcode } = req.query;

    let sql = `
    SELECT 
            date_referin,
            hospcode,
            refer_in,
            status,
            COUNT(idpersonal_patient) AS count
        FROM 
            Refer
    `;

    const values = [];

    if (hospcode !== '50000') {
        sql += ' WHERE hospcode = ?';
        values.push(hospcode);
    }

    sql += `
    GROUP BY 
        date_referin

    `;

    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.get('/referout1/card', (req, res) => {
    const { hospcode } = req.query;

    let sql = `
    SELECT 
            date_refer,
            hospcode,
            refer_out,
            status,
            COUNT(idpersonal_patient) AS count
        FROM 
            Refer
    `;

    const values = [];

    if (hospcode !== '50000') {
        sql += ' WHERE hospcode = ?';
        values.push(hospcode);
    }

    sql += `
    GROUP BY 
        date_refer

    `;

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
