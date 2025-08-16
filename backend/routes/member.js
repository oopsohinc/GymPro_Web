const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

// Lấy danh sách thành viên
router.get('/members', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Members');
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

// Lấy thông tin thành viên theo ID
router.get('/members/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT 
          m.user_id as id,
          m.full_name,
          m.email,
          m.phone,
          m.description,
          m.date_created,
          ISNULL(ms.name, 'No Membership') as membership,
          ISNULL(class_count.enrolled, 0) as enrolled
        FROM Members m
        LEFT JOIN Member_Memberships mm ON m.user_id = mm.user_id 
        LEFT JOIN Memberships ms ON mm.membership_id = ms.membership_id
        LEFT JOIN(
          SELECT user_id, COUNT(*) as enrolled 
          FROM Member_Classes 
          GROUP BY user_id
        ) class_count ON m.user_id = class_count.user_id
        WHERE m.user_id = @id
        ORDER BY m.user_id;
    `);

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).send('Không tìm thấy thành viên');
    }
  } catch (err) {
    console.error('Lỗi khi lấy thông tin thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

// Thêm thành viên mới
router.post('/members', async (req, res) => {
  const { full_name, email, phone, membership_id, start_date } = req.body;
  try {
    const pool = await sql.connect(config);

    // Thêm thành viên mới
    await pool.request()
      .input('full_name', sql.NVarChar, full_name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .input('membership_id', sql.Int, membership_id)
      .input('start_date', sql.Date, start_date)
      .query(`
        INSERT INTO Members (full_name, email, phone, membership_id, start_date) 
        VALUES (@full_name, @email, @phone, @membership_id, @start_date)
      `);

    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi thêm thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

// Xóa thành viên
router.delete('/members/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);

    // Xóa thành viên theo ID
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Members WHERE id = @id');

    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi xóa thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật thông tin thành viên
router.put('/members/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, membership_id, start_date } = req.body;
  try {
    const pool = await sql.connect(config);

    // Cập nhật thông tin thành viên
    await pool.request()
      .input('id', sql.Int, id)
      .input('full_name', sql.NVarChar, full_name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .input('membership_id', sql.Int, membership_id)
      .input('start_date', sql.Date, start_date)
      .query(`
        UPDATE Members
        SET full_name = @full_name,
            email = @email,
            phone = @phone,
            membership_id = @membership_id,
            start_date = @start_date
        WHERE id = @id
      `);

    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi cập nhật thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;