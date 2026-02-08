
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';
import { employeeAPI, attendanceAPI } from '../services/api';
import './AttendanceForm.css';

interface Props {
  onSuccess: () => void;
}

const AttendanceForm: React.FC<Props> = ({ onSuccess }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present' as 'Present' | 'Absent',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data.data || []);
    } catch (err) {
      console.error('Failed to load employees');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    try {
      await attendanceAPI.mark(formData);
      setFormData({ ...formData, employeeId: '' });
      onSuccess();
      alert('Attendance marked successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <h3>Mark Attendance</h3>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Employee *</label>
        <select
          value={formData.employeeId}
          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.employeeId}>
              {emp.employeeId} - {emp.fullName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date *</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}

          required
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="form-group">
        <label>Status *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="Present"
              checked={formData.status === 'Present'}
              onChange={(e) => setFormData({ ...formData, status: 'Present' })}
            />
            Present
          </label>
          <label>
            <input
              type="radio"

              value="Absent"
              checked={formData.status === 'Absent'}
              onChange={(e) => setFormData({ ...formData, status: 'Absent' })}
            />
            Absent
          </label>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Marking...' : 'Mark Attendance'}
      </button>
    </form>
  );
};

export default AttendanceForm;
