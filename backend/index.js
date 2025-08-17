const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../public')));
app.use(cors({
    origin: '*', // Cho phép tất cả các nguồn gốc
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Cho phép các phương thức cụ thể
    allowedHeaders: ['Content-Type', 'Authorization'] // Cho phép các tiêu đề cụ thể
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Start server
const port = 3000;
app.listen(port, async () => {
  console.log(`Server chạy tại http://localhost:${port}`);
  
  // Mở login.html trong trình duyệt
  // await open(`http://localhost:${port}/login.html`);
});

const statsRoutes = require('./routes/stats');
app.use('/api/stats', statsRoutes);

const membershipRoutes = require('./routes/membership');
app.use('/api', membershipRoutes);

const trainerRoutes = require('./routes/trainer');
app.use('/api', trainerRoutes);

const memberRoutes = require('./routes/member');
app.use('/api', memberRoutes);

const classRoutes = require('./routes/class');
app.use('/api', classRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api', paymentRoutes);
