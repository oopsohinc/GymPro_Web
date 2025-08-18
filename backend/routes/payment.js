const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../db');
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');

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

// Thanh toán trực tiếp
router.post('/payments/create-qr', async (req, res) => {
    const vnpay = new VNPay({
        tmnCode: 'YXC7JZLY',
        secureSecret: '7CYIPMPBQJ1N84RIMRBDT37IKIHPHRYF',
        vnpayHost: 'https://sandbox.vnpayment.vn',
        testMode: true,
        hashAlgorithm: 'SHA512',
        loggerFn: ignoreLogger
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const vnpayResponse = await vnpay.buildPaymentUrl({
        vnp_Amount: 50000,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: 'txn002',
        vnp_OrderInfo: 'Payment for order 002',
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://localhost:3000/api/payments/callback',
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date(), 'yyyyMMddHHmmss'),
        vnp_ExpireDate: dateFormat(tomorrow)
    });

    return res.status(200).json({ vnpayResponse });
});

router.get('/payments/callback', async (req, res) => {
    console.log('Payment callback received:', req.query);
    res.status(200).send('OK');
});

module.exports = router;