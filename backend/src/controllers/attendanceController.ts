
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Attendance from '../models/Attendance';
import Employee from '../models/Employee';

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { employeeId, date, status } = req.body;

    const employee = await Employee.findOne({ where: { employeeId } });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const [attendance, created] = await Attendance.findOrCreate({
      where: { employeeId, date: new Date(date) },
      defaults: { employeeId, date, status }
    });

    if (!created) {
      await attendance.update({ status });
      return res.json({
        success: true,
        message: 'Attendance updated successfully',
        data: attendance
      });
    }

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAttendanceByEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;

    const attendance = await Attendance.findAll({
      where: { employeeId },
      order: [['date', 'DESC']]
    });

    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findAll({ order: [['date', 'DESC']] });
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
