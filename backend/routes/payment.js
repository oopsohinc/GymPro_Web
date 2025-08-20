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
router.get('/payments/:id', async (req, res) => {
    try {
        const paymentId = parseInt(req.params.id, 10); // ép kiểu sang số nguyên
        console.log('paymentId:', paymentId, 'typeof:', typeof paymentId);

        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('paymentId', sql.Int, paymentId)
            .query(`
        SELECT *
        FROM Payments
        WHERE Payments.id = @paymentId
      `);

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error fetching payment by ID:', err);
        res.status(500).send('Server error');
    }
});

router.patch('/payments/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', id)
      .input('status', status)
      .query('UPDATE Payments SET payment_status = @status WHERE id = @id');

    res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
  } catch (err) {
    console.error('Lỗi cập nhật status:', err);
    res.status(500).json({ error: 'Không thể cập nhật trạng thái payment' });
  }
});


// Thanh toán trực tiếp
router.post('/payments/create-qr', async (req, res) => {
    const { paymentId, amount, full_name, orderInfo } = req.body;

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
        vnp_Amount: amount,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: `txn_${paymentId}_${dateFormat(new Date(), "yyyymmddHHMMss")}`,
        vnp_OrderInfo: orderInfo || `Thanh toán cho đơn hàng ${paymentId}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://127.0.0.1:5500/html/index.html#callback',
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date(), 'yyyyMMddHHmmss'),
        vnp_ExpireDate: dateFormat(tomorrow)
    });

    return res.status(200).json({ vnpayResponse });
});

router.get('/payments/callback', async (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  res.redirect(`http://127.0.0.1:5500/html/index.html#callback?${query}`);
});


module.exports = router;