
# 🏢 HRMS Lite

**Lightweight Human Resource Management System**

A modern, full-stack web application for managing employees and tracking attendance.

## 🌐 Live Demo

- **Frontend**: https://hrms-lite.vercel.app
- **Backend API**: https://hrms-lite-backend.onrender.com

## ✨ Features

### Employee Management
- ✅ Add new employees with ID, name, email, and department
- ✅ View complete employee list
- ✅ Delete employees
- ✅ Email validation
- ✅ Duplicate ID/email prevention

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ Select employee from dropdown
- ✅ Date selection with validation
- ✅ Prevent duplicate attendance entries
- ✅ View attendance history

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Axios for API calls
- CSS3 for styling
- Responsive design

**Backend:**
- Node.js + Express.js
- TypeScript
- SQLite database (file-based)
- Sequelize ORM
- Express Validator

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: SQLite (persistent on Render)

## 📦 Installation & Local Setup

### Prerequisites
- Node.js 18+ 
- npm 9+

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server runs on `http://localhost:5000`


### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App opens on `http://localhost:3000`

## 🔗 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/:employeeId` - Get attendance by employee
- `POST /api/attendance` - Mark attendance


### System
- `GET /health` - Health check

## 📁 Project Structure
```
hrms-lite/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   └── server.ts        # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main component
│   └── package.json
└── README.md
```

## 🎯 Features Implemented

- [x] Employee CRUD operations
- [x] Attendance tracking
- [x] Form validation
- [x] Error handling
- [x] Responsive UI
- [x] Loading states
- [x] Empty states
- [x] TypeScript throughout
- [x] RESTful API design
- [x] Production deployment

## 🚀 Deployment

**Backend (Render):**
- Automatic deployments from main branch
- Environment: Node.js
- Database: SQLite (persistent)


**Frontend (Vercel):**
- Automatic deployments from main branch
- Framework: Create React App
- Build: Optimized production build

## 📝 Assumptions & Limitations

- Single admin user (no authentication)
- SQLite database (suitable for small-medium scale)
- No advanced reporting features
- No email notifications
- Basic attendance tracking (no leave management)

## 👤 Author

**Rudraraj Radhwani**

- GitHub: [@Rudraraj24](https://github.com/Rudraraj24)

## 📄 License

MIT License

---

**Built as a full-stack coding assignment demonstrating:**
- Modern React development
- RESTful API design
- Database modeling
- Production deployment
- Clean, maintainable code
