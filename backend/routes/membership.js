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

    // Kiểm tra xem tên membership đã tồn tại chưa
    const checkResult = await pool.request()
      .input('name', sql.NVarChar, name)
      .query('SELECT COUNT(*) AS count FROM Memberships WHERE LOWER(name) = LOWER(@name)');

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ success: false, message: 'Tên gói tập đã tồn tại' });
    }

    // Thêm membership mới nếu tên chưa tồn tại
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

// Xóa gói tập
router.delete('/memberships/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Memberships WHERE id = @id');
    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi xóa membership:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật thông tin gói tập
router.put('/memberships/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, duration } = req.body;
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('price', sql.Decimal(10, 2), price)
      .input('duration', sql.Int, duration)
      .query(`
        UPDATE Memberships
        SET name = @name, price = @price, duration = @duration
        WHERE membership_id = @id
      `);
    res.json({ success: true, message: 'Cập nhật gói tập thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật membership:', err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;
