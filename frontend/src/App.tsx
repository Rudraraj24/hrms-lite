import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import AttendanceForm from './components/AttendanceForm';
import './App.css';

type Tab = 'employees' | 'attendance';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('employees');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🏢 HRMS Lite</h1>
        <p>Human Resource Management System</p>
      </header>


      <nav className="nav">
        <div className="nav-buttons">
          <button
            className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            👥 Employee Management
          </button>
          <button
            className={`nav-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            📋 Attendance Management
          </button>
        </div>
      </nav>

      <div className="container">
        {activeTab === 'employees' && (
          <>
            <h2 className="page-title">Employee Management</h2>
            <div className="grid">
              <EmployeeForm onSuccess={handleSuccess} />
              <div></div>
            </div>
            <EmployeeList key={refreshKey} />
          </>
        )}

        {activeTab === 'attendance' && (
          <>
            <h2 className="page-title">Attendance Management</h2>
            <div className="grid">
              <AttendanceForm onSuccess={handleSuccess} />
              <div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
