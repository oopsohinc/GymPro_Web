const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

// Lấy danh sách trainer
router.get('/trainers', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Trainers');
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

// Thêm trainer mới
router.post('/trainers', async (req, res) => {
  const { full_name, specialization } = req.body;
  console.log('Request Body:', req.body); // Log the request body
  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('full_name', sql.NVarChar, full_name)
      .input('specialization', sql.VarChar, specialization)
      .query(`
        INSERT INTO Trainers (full_name, specialization) 
        VALUES (@full_name, @specialization)
      `);
    res.json({ success: true, message: 'Thêm trainer thành công' });
  } catch (err) {
    console.error('Lỗi khi thêm trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật trạng thái trainer
router.patch('/trainers/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.Bit, status)
      .query(`
        UPDATE Trainers
        SET status = @status
        WHERE trainer_id = @id
      `);
    res.json({ success: true, message: 'Cập nhật trạng thái trainer thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

// Xóa trainer
router.delete('/trainers/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .query(`
        DELETE FROM Trainers
        WHERE trainer_id = @id
      `);
    res.json({ success: true, message: 'Xóa trainer thành công' });
  } catch (err) {
    console.error('Lỗi khi xóa trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật thông tin trainer
router.put('/trainers/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, specialization } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('full_name', sql.NVarChar, full_name)
      .input('specialization', sql.VarChar, specialization)
      .query(`
        UPDATE Trainers
        SET full_name = @full_name, specialization = @specialization
        WHERE trainer_id = @id
      `);
    res.json({ success: true, message: 'Cập nhật thông tin trainer thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;
