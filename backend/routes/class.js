const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

// Lấy danh sách lớp học
router.get('/classes', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT	Classes.class_id, Classes.name, Classes.schedule, Classes.time, 
              Classes.capacity, Classes.max_capacity, Trainers.trainer_id, 
              Trainers.full_name, Trainers.specialization, Levels.*, Classes.description
      FROM	Classes JOIN
        Levels ON Classes.level_id = Levels.level_id JOIN
        Trainers ON Classes.trainer_id = Trainers.trainer_id
      order by Levels.level_id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});
router.get('/classes/levels', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM Levels');
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách cấp độ:', err);
    res.status(500).send('Lỗi server');
  }
});
router.get('/classes/members', async (req, res) => {
try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT	Classes.class_id, Classes.name, Classes.description, Classes.time, 
              Classes.schedule, Classes.capacity, Classes.max_capacity, Classes.trainer_id, 
              Classes.level_id, Member_Classes.user_id, Member_Classes.join_date, t.full_name
      FROM	Classes INNER JOIN
        Member_Classes ON Classes.class_id = Member_Classes.class_id join
        Trainers t on Classes.trainer_id = t.trainer_id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thành viên lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});

// Lấy lớp học theo ID
router.get('/classes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Classes WHERE class_id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy lớp học' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Lỗi khi lấy thông tin lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});

// Thêm lớp học mới
router.post('/classes', async (req, res) => {
  const { name, schedule, time, max_capacity, trainer_id, level_id } = req.body;
  try {
    console.log('Config:', config);
    const pool = await sql.connect(config);

    // Thêm lớp học mới
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('schedule', sql.NVarChar, schedule)
      .input('time', sql.Time, time)
      .input('max_capacity', sql.Int, max_capacity)
      .input('trainer_id', sql.Int, trainer_id)
      .input('level_id', sql.Int, level_id)
      .query(`
        INSERT INTO Classes (name, schedule, time, max_capacity, trainer_id, level_id)
        VALUES (@name, @schedule, @time, @max_capacity, @trainer_id, @level_id)
      `);

    res.json({ success: true, message: 'Thêm lớp học thành công' });
  } catch (err) {
    console.error('Lỗi khi thêm lớp học:', err);
    res.status(500).send(`Lỗi server: ${err.message}`);
  }
});
router.post('/classes_members', async (req, res) => {
  const { class_id, user_id } = req.body;
  try {
    const pool = await sql.connect(config);

    // Thêm lớp học mới
    await pool.request()
      .input('class_id', sql.Int, class_id)
      .input('user_id', sql.Int, user_id)
      .query(`
        INSERT INTO Member_Classes (class_id, user_id)
        VALUES (@class_id, @user_id)
      `);

    res.json({ success: true, message: 'Thêm lớp học thành công' });
  } catch (err) {
    console.error('Lỗi khi thêm lớp học:', err);
    res.status(500).send(`Lỗi server: ${err.message}`);
  }
});

// Cập nhật thông tin lớp học
router.put('/classes/:id', async (req, res) => {
  const { id } = req.params;
  // const { fields } = req.body;
  const fields = req.body || {};
  try {
    const pool = await sql.connect(config);
    const request = pool.request().input('id', sql.Int, id);
    const fieldConfig = [
      { key: 'name', type: sql.NVarChar },
      { key: 'description', type: sql.NVarChar },
      { key: 'schedule', type: sql.NVarChar },
      { key: 'time', type: sql.Time },
      { key: 'capacity', type: sql.Int },
      { key: 'max_capacity', type: sql.Int },
      { key: 'trainer_id', type: sql.Int },
      { key: 'level_id', type: sql.Int }
    ];
    const updates = [];

    fieldConfig.forEach(({ key, type }) => {
      const value = fields[key];
      console.log(`Key: ${key}, Value: ${value}`);
      if (value !== undefined && value !== '') {
        request.input(key, type, value);
        updates.push(`${key} = @${key}`);
      }
    });


    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Không có trường nào để cập nhật' });
    }

    const updateQuery = `
      UPDATE Classes
      SET ${updates.join(', ')}
      WHERE class_id = @id
    `;

    await request.query(updateQuery);

    res.json({ success: true, message: 'Cập nhật lớp học thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});

// Xóa lớp học
router.delete('/classes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config);

    // Xóa lớp học theo ID
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Classes WHERE class_id = @id');

    res.json({ success: true, message: 'Xóa lớp học thành công' });
  } catch (err) {
    console.error('Lỗi khi xóa lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});

// Cập nhật trạng thái lớp học
router.patch('/classes/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const pool = await sql.connect(config);

    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.Bit, status)
      .query('UPDATE Classes SET status = @status WHERE class_id = @id');

    res.json({ success: true, message: 'Cập nhật trạng thái thành công' });
  } catch (err) {
    console.error('Lỗi khi cập nhật trạng thái lớp học:', err);
    res.status(500).send('Lỗi server');
  }
});

// Lấy danh sách lớp học theo trainer
router.get('/classes/trainer/:trainerId', async (req, res) => {
  const { trainerId } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('trainerId', sql.Int, trainerId)
      .query('SELECT * FROM Classes WHERE trainer_id = @trainerId');

    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy lớp học theo trainer:', err);
    res.status(500).send('Lỗi server');
  }
});

// Lấy danh sách lớp học có trạng thái active
router.get('/classes/active', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .query('SELECT * FROM Classes WHERE status = 1 ORDER BY name');

    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy lớp học active:', err);
    res.status(500).send('Lỗi server');
  }
});

// Lấy danh sách lớp học đã book
router.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(`SELECT Classes.time, Classes.name, Classes.schedule, Classes.class_id, Trainers.trainer_id, 
        Trainers.full_name, Member_Classes.user_id 
        FROM     Classes INNER JOIN
        Trainers ON Classes.trainer_id = Trainers.trainer_id INNER JOIN
        Member_Classes ON Classes.class_id = Member_Classes.class_id
        WHERE Member_Classes.user_id = @userId`);

    res.json(result.recordset);
  } catch (err) {
    console.error('Lỗi khi lấy lớp học active:', err);
    res.status(500).send('Lỗi server');
  }
}); 
module.exports = router;