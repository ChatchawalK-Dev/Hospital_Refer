const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    const { name, email, street, city, state, postal_code } = req.body;
  
    pool.query('SELECT id FROM addresses WHERE street = ? AND city = ? AND state = ? AND postal_code = ?', [street, city, state, postal_code], (err, results) => {
      if (err) throw err;
  
      if (results.length > 0) {
        const addressId = results[0].id;
  
        pool.query('INSERT INTO personal_data (name, email, address_id) VALUES (?, ?, ?)', [name, email, addressId], (err, personalDataResult) => {
          if (err) throw err;
          res.json({ message: 'Personal data added successfully' });
        });
      } else {
        // เพิ่มข้อมูลที่อยู่ใหม่
        pool.query('INSERT INTO addresses (street, city, state, postal_code) VALUES (?, ?, ?, ?)', [street, city, state, postal_code], (err, addressInsertResult) => {
          if (err) throw err;
  
          const addressId = addressInsertResult.insertId;
  
          // เพิ่มข้อมูลส่วนตัวโดยใช้ ID ของที่อยู่ใหม่
          pool.query('INSERT INTO personal_data (name, email, address_id) VALUES (?, ?, ?)', [name, email, addressId], (err, personalDataResult) => {
            if (err) throw err;
            res.json({ message: 'Personal data added successfully' });
          });
        });
      }
    });
  });

module.exports = router;