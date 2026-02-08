
import React, { useState } from 'react';
import { employeeAPI } from '../services/api';
import './EmployeeForm.css';

interface Props {
  onSuccess: () => void;
}

const EmployeeForm: React.FC<Props> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await employeeAPI.create(formData);
      setFormData({ employeeId: '', fullName: '', email: '', department: '' });
      onSuccess();
      alert('Employee added successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Employee ID *</label>
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
          placeholder="e.g., EMP001"
        />
      </div>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
      </div>

      <div className="form-group">
        <label>Department *</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          placeholder="IT, HR, Finance, etc."
        />
      </div>


      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
