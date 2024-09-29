const express = require('express');
const router = express.Router();
const pool = require('./db');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { personal_id, email, hospital_name, hospital_id, selectedProvince, selectedDistrict, prename, name, lastname, sex, birthday, position, level, agency, phone_number, phone_number_agency, password } = req.body;

    pool.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบ email' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email นี้ถูกใช้ไปแล้ว' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            pool.query(`
            INSERT INTO user 
            SET personal_id = ?, 
                email = ?, 
                hospital_name = ?, 
                hospcode = ?, 
                province = ?, 
                district = ?, 
                prename = ?, 
                name = ?, 
                lastname = ?, 
                sex = ?, 
                birthday = ?, 
                position = ?, 
                level = ?, 
                agency = ?, 
                phone_number = ?, 
                phone_number_agency = ?, 
                password = ?`, 
            [personal_id, email, hospital_name, hospital_id, selectedProvince, selectedDistrict, prename, name, lastname, sex, birthday, position, level, agency, phone_number, phone_number_agency, hashedPassword], 
            (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้' });
                }
                res.status(201).json({ message: 'ลงทะเบียนผู้ใช้เรียบร้อยแล้ว' });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเข้ารหัส password' });
        }
    });
});

module.exports = router;

