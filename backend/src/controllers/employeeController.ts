
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Employee from '../models/Employee';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: employees });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { employeeId, fullName, email, department } = req.body;

    const existingEmployee = await Employee.findOne({
      where: {
        [require('sequelize').Op.or]: [{ employeeId }, { email }]
      }
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID or Email already exists'
      });
    }

    const employee = await Employee.create({ employeeId, fullName, email, department });

    
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Employee.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }


    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
