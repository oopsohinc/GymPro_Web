const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

// Lấy danh sách membership
router.get('/memberships', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Memberships');
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách membership:', err);
    res.status(500).send('Lỗi server');
  }
});

// Thêm membership mới
router.post('/memberships', async (req, res) => {
  const { name, price, duration } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('price', sql.Decimal(10, 2), price)
      .input('duration', sql.Int, duration)
      .query(`
        INSERT INTO Memberships (name, price, duration) 
        VALUES (@name, @price, @duration)
      `);
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi thêm membership:', err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;
