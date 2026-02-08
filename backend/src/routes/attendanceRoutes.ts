
import { Router } from 'express';
import { body } from 'express-validator';
import { markAttendance, getAttendanceByEmployee, getAllAttendance } from '../controllers/attendanceController';

const router = Router();

router.get('/', getAllAttendance);
router.get('/:employeeId', getAttendanceByEmployee);

router.post('/', [
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status').isIn(['Present', 'Absent']).withMessage('Status must be Present or Absent')
], markAttendance);

export default router;
