const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');

// Lấy danh sách thanh toán
router.get('/payments', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT	Payments.id, FORMAT(Payments.payment_date, 'dd-MM-yyyy') as payment_date, Payments.amount, 
    		    Members.user_id, Memberships.membership_id, Members.full_name, Payments.payment_status
            FROM Payments JOIN
                Members ON Payments.user_id = Members.user_id JOIN
                Memberships ON Payments.membership_id = Memberships.membership_id
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching payments:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;