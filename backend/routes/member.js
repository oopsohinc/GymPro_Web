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
router.get('/members/memberships', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
        SELECT 
          m.user_id as id,
          m.full_name,
          m.email,
          m.phone,
          m.description,
		      m.date_of_birth,
          m.date_created,
          ISNULL(ms.name, 'No Membership') as membership
        FROM Members m
        LEFT JOIN Member_Memberships mm ON m.user_id = mm.user_id 
        LEFT JOIN Memberships ms ON mm.membership_id = ms.membership_id
        ORDER BY m.user_id;
      `);
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
		      m.date_of_birth,
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
  const { full_name, email, phone, date_of_birth, date_created, description } = req.body;
  try {
    const pool = await sql.connect(config);

    // Thêm thành viên mới
    await pool.request()
      .input('full_name', sql.NVarChar, full_name)
      .input('email', sql.NVarChar, email)
      .input('phone', sql.NVarChar, phone)
      .input('date_of_birth', sql.Date, date_of_birth)
      .input('date_created', sql.Date, date_created)
      .input('description', sql.NVarChar, description)
      .query(`
        INSERT INTO Members (full_name, email, phone, date_of_birth, date_created, description) 
        VALUES (@full_name, @email, @phone, @date_of_birth, @date_created, @description)
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
      .query('DELETE FROM Members WHERE user_id = @id');

    res.json({ success: true });
  } catch (err) {
    console.error('Lỗi khi xóa thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật thông tin thành viên
router.put('/members/:id', async (req, res) => {
  const { id } = req.params;
  const fields = req.body || {};
  try {
    const pool = await sql.connect(config);
    const request = pool.request().input('id', sql.Int, id);
    const fieldConfig = [
      { name: 'full_name', type: sql.NVarChar },
      { name: 'email', type: sql.NVarChar },
      { name: 'phone', type: sql.NVarChar },
      { name: 'description', type: sql.NVarChar },
      { name: 'date_of_birth', type: sql.Date }
    ];
    const updates = [];

    fieldConfig.forEach(({ name, type }) => {
      const value = fields[name];
      console.log(`Key: ${name}, Value: ${value}`);
      if (value !== undefined && value !== '') {
        request.input(name, type, value);
        updates.push(`${name} = @${name}`);
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Không có trường nào để cập nhật' });
    }

    // Cập nhật thông tin thành viên
    const query = `
      UPDATE Members
      SET ${updates.join(', ')}
      WHERE user_id = @id
    `;

    await request.query(query);

    res.json({ success: true, message: 'Cập nhật thông tin thành viên thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật thành viên:', err);
    res.status(500).send('Lỗi server');
  }
});

module.exports = router;