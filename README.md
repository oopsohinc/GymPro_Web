# GymPro Web

**GymPro Web** là một hệ thống quản lý phòng tập thể dục hiện đại được xây dựng với Node.js và Express backend, cùng với giao diện web responsive. Hệ thống cung cấp các công cụ toàn diện để quản lý thành viên, huấn luyện viên, lớp học và thanh toán.

## 🏋️ Tính năng chính

### Cho Chủ phòng tập
- **Dashboard**: Thống kê tổng quan về thành viên, huấn luyện viên, lớp học
- **Quản lý thành viên**: Thêm, sửa, xóa thành viên và quản lý gói tập
- **Quản lý huấn luyện viên**: Quản lý thông tin HLV, chuyên môn và trạng thái
- **Quản lý lớp học**: Tạo lịch học, phân công HLV, quản lý sức chứa lớp
- **Quản lý gói tập**: Tạo và chỉnh sửa các gói membership
- **Quản lý thanh toán**: Theo dõi các khoản phí và hóa đơn (đang phát triển)

### Cho Thành viên
- **Trang cá nhân**: Xem thông tin cá nhân và gói tập hiện tại
- **Lịch tập**: Xem lịch các lớp học đã đăng ký
- **Giao diện responsive**: Tối ưu cho cả desktop và mobile

## 🛠️ Công nghệ sử dụng

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQL Server** - Cơ sở dữ liệu
- **mssql** - SQL Server driver cho Node.js

### Frontend
- **HTML5/CSS3** - Cấu trúc và styling
- **JavaScript (Vanilla)** - Logic phía client
- **Responsive Design** - Tương thích mobile/desktop
- **Lucide Icons** - Thư viện icon

### Tools & Dependencies
- **cors** - Cross-origin resource sharing
- **body-parser** - Parse request bodies
- **concurrently** - Chạy đồng thời backend và frontend
- **live-server** - Development server cho frontend

## 📋 Yêu cầu hệ thống

### Phần mềm cần thiết
- **Node.js** >= 16.0.0
- **SQL Server** (hoặc SQL Server Express)
- **npm** >= 8.0.0

### Cấu hình tối thiểu
- **RAM**: 4GB
- **Storage**: 1GB trống
- **Network**: Kết nối internet (để tải dependencies)

## 🚀 Cài đặt và chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd gympro_web
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình database

#### Tạo database SQL Server
1. Mở SQL Server Management Studio
2. Tạo database mới tên `GymProDB`
3. Chạy script SQL mới nhất:
   - `databases/script_2025-07-22.sql`
   - `databases/script_2025-07-26.sql`
   - `databases/script_2025-08-10.sql`
   - `databases/script_2025-08-16.sql`

#### Cấu hình kết nối database
Chỉnh sửa file `backend/db.js`:
```javascript
const config = {
    user: 'sa',                    // Username SQL Server
    password: '123456',            // Password của bạn
    server: 'localhost',           // Server address
    database: 'GymProDB',
    options: {
        trustServerCertificate: true
    }
};
```

### 4. Chạy ứng dụng

#### Development mode
```bash
npm start
```

Lệnh này sẽ:
- Khởi động backend server tại `http://localhost:3000`
- Khởi động live-server cho frontend tại `http://localhost:5500`
- Tự động mở browser với trang login

## 📁 Cấu trúc thư mục

```
gympro_web/
├── backend/                 # Backend Node.js
│   ├── index.js            # Entry point
│   ├── db.js              # Database configuration
│   └── routes/            # API routes
│       ├── auth.js        # Authentication
│       ├── member.js      # Member management
│       ├── trainer.js     # Trainer management
│       ├── class.js       # Class management
│       ├── membership.js  # Membership management
│       └── stats.js       # Statistics
├── public/                # Frontend files
│   ├── login.html         # Login page
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   ├── html/             # Main app pages
│   └── Member/           # Member dashboard
├── databases/            # SQL scripts
└── package.json         # Dependencies
```

## 🔐 Đăng nhập hệ thống

### Tài khoản chủ phòng
- **Username**: admin
- **Password**: (tùy theo cấu hình database)
- **Quyền**: Quản lý toàn bộ hệ thống

### Tài khoản thành viên
- **Username**: email đã đăng ký
- **Password**: (do chủ phòng cung cấp)
- **Quyền**: Xem thông tin cá nhân và lịch tập

## 📊 API Endpoints

### Authentication
- `POST /api/login` - Đăng nhập

### Statistics  
- `GET /api/stats` - Lấy thống kê tổng quan

### Members
- `GET /api/members` - Danh sách thành viên
- `GET /api/members/:id` - Thông tin thành viên
- `POST /api/members` - Thêm thành viên mới
- `PUT /api/members/:id` - Cập nhật thành viên
- `DELETE /api/members/:id` - Xóa thành viên

### Trainers
- `GET /api/trainers` - Danh sách huấn luyện viên
- `POST /api/trainers` - Thêm HLV mới
- `PUT /api/trainers/:id` - Cập nhật thông tin HLV
- `PATCH /api/trainers/:id/status` - Cập nhật trạng thái HLV
- `DELETE /api/trainers/:id` - Xóa HLV

### Classes
- `GET /api/classes` - Danh sách lớp học
- `GET /api/classes/:id` - Thông tin lớp học
- `POST /api/classes` - Tạo lớp học mới
- `PUT /api/classes/:id` - Cập nhật lớp học
- `DELETE /api/classes/:id` - Xóa lớp học

### Memberships
- `GET /api/memberships` - Danh sách gói tập
- `POST /api/memberships` - Tạo gói tập mới
- `PUT /api/memberships/:id` - Cập nhật gói tập
- `DELETE /api/memberships/:id` - Xóa gói tập

## 🔧 Cấu hình

### CORS Configuration
Backend đã được cấu hình để cho phép CORS từ mọi nguồn. Trong môi trường production, nên giới hạn origins cụ thể.

## 🐛 Troubleshooting

### Lỗi kết nối database
1. Kiểm tra SQL Server đã chạy
2. Xác nhận thông tin đăng nhập trong `backend/db.js`
3. Kiểm tra firewall cho phép kết nối port 1433

### Lỗi CORS
- Đảm bảo backend đang chạy trước khi truy cập frontend
- Kiểm tra cấu hình CORS trong `backend/index.js`

### Port conflicts
- Backend mặc định chạy port 3000
- Frontend live-server chạy port 5500
- Thay đổi port trong `package.json` nếu bị conflict

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án được phát triển bởi **ophnc**. 

## 📞 Liên hệ

- **Author**: ophnc
- **Email**: viethong.261004@gmail.com
- **Project**: GymPro Web Management System
- **Version**: 1.1.0

---

**Lưu ý**: Đây là phiên bản đang phát triển (WIP - Work In Progress). Một số tính năng có thể chưa hoàn thiện hoặc đang trong quá trình cải tiến.
