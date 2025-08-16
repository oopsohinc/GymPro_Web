const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);

    // Truy vấn số lượng thành viên
    const result = await pool.request().query(`
      SELECT COUNT(*) as totalMembers FROM Users WHERE role = 'member'
    `);
    const totalMembers = result.recordset[0].totalMembers;

    // Truy vấn số lượng huấn luyện viên
    const trainersResult = await pool.request().query(`
      SELECT 
        COUNT(*) as totalTrainers,
        COUNT(CASE WHEN status = 1 THEN 1 END) as activeTrainers,
        COUNT(CASE WHEN status = 0 THEN 1 END) as inactiveTrainers
      FROM Trainers
    `);
    const totalTrainers = trainersResult.recordset[0];

    // Truy vấn số lượng lớp học
    const classesResult = await pool.request().query(`
      SELECT COUNT(*) as totalClasses FROM Classes
    `);
    const totalClasses = classesResult.recordset[0].totalClasses;

    // Truy vấn số lượng gói tập
    const membershipsResult = await pool.request().query(`
      SELECT COUNT(*) as totalMemberships FROM Memberships
    `);
    const totalMemberships = membershipsResult.recordset[0].totalMemberships;

    res.json({  totalMembers,
                totalClasses,
                totalMemberships,
                totalTrainersStats: totalTrainers.totalTrainers,
                activeTrainers: totalTrainers.activeTrainers,
                inactiveTrainers: totalTrainers.inactiveTrainers
     });
  } catch (err) {
    console.error("Lỗi API /stats:", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

module.exports = router;
