const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบ email' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้ที่ใช้อีเมลนี้' });
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
        }

        const userData = {
            name: user.name,
            lastname: user.lastname,
            hospital_name: user.hospital_name,
            role: user.role
        };
        
        const hospcode = user.hospcode;
        
        res.status(200).json({ userData, hospcode });
    });
});

module.exports = router;
