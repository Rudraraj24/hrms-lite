
export interface Employee {

  id?: number;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Attendance {
  id?: number;
  employeeId: string;
  date: string;
  status: 'Present' | 'Absent';
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}
