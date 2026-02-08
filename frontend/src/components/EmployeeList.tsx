
import React, { useEffect, useState } from 'react';
import { Employee } from '../types';
import { employeeAPI } from '../services/api';
import './EmployeeList.css';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data || []);
      setError('');

    } catch (err: any) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await employeeAPI.delete(id);
      loadEmployees();
    } catch (err: any) {
      alert('Failed to delete employee');
    }
  };


  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">{error}</div>;
  if (employees.length === 0) return <div className="empty">No employees found. Add one to get started!</div>;

  return (
    <div className="employee-list">
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employeeId}</td>

              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td className="actions">
                <button onClick={() => handleDelete(emp.id!)} className="btn-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
