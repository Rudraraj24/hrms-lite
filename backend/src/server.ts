
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import employeeRoutes from './routes/employeeRoutes';
import attendanceRoutes from './routes/attendanceRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'HRMS Lite API is running' });
});

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('✅ Database synchronized');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Database: SQLite (file-based)`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
