
import { Router } from 'express';
import { body } from 'express-validator';
import { getAllEmployees, createEmployee, deleteEmployee } from '../controllers/employeeController';

const router = Router();

router.get('/', getAllEmployees);

router.post('/', [
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('department').notEmpty().withMessage('Department is required')
], createEmployee);

router.delete('/:id', deleteEmployee);

export default router;
