const express = require('express');
const router = express.Router();
const { sql, config } = require('../db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Users WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            res.json({
                success: true,
                role: user.role, // 'chuphong' hoặc 'member'
                id: user.id
            });
        } else {
            res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
});

module.exports = router;
