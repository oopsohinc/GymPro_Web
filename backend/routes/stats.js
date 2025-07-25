const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      SELECT COUNT(*) as totalMembers FROM Users WHERE role = 'member'
    `);
    const totalMembers = result.recordset[0].totalMembers;
    res.json({ totalMembers });
  } catch (err) {
    console.error("Lỗi API /stats:", err);
    res.status(500).send("Lỗi máy chủ");
  }
});

module.exports = router;
