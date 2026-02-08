
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface EmployeeAttributes {
  id?: number;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
  public id!: number;
  public employeeId!: string;
  public fullName!: string;
  public email!: string;
  public department!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Employee.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employeeId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'employees',
  timestamps: true,
});

export default Employee;
