
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface AttendanceAttributes {
  id?: number;
  employeeId: string;
  date: Date;
  status: 'Present' | 'Absent';
}

class Attendance extends Model<AttendanceAttributes> implements AttendanceAttributes {
  public id!: number;
  public employeeId!: string;
  public date!: Date;
  public status!: 'Present' | 'Absent';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attendance.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Present', 'Absent'),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'attendance',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['employeeId', 'date'],
    },
  ],
});

export default Attendance;
