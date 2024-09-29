const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post('/logout', async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error during logout' });
        }
        
        res.json({ message: 'Logout successful', clearLocalStorage: true });
      });
  });

module.exports = router;
