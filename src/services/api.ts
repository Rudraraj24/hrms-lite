
import axios from 'axios';
import { Employee, Attendance, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeAPI = {
  getAll: () => api.get<ApiResponse<Employee[]>>('/employees'),
  create: (data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<ApiResponse<Employee>>('/employees', data),
  delete: (id: number) => api.delete<ApiResponse<void>>(`/employees/${id}`),
};

export const attendanceAPI = {
  getAll: () => api.get<ApiResponse<Attendance[]>>('/attendance'),
  getByEmployee: (employeeId: string) => 
    api.get<ApiResponse<Attendance[]>>(`/attendance/${employeeId}`),
  mark: (data: Omit<Attendance, 'id' | 'createdAt'>) => 
    api.post<ApiResponse<Attendance>>('/attendance', data),
};

export default api;
