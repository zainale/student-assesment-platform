import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerDashboard({ user, setUser }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data.filter(t => t.lecturer_id === user.id));
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Lecturer Panel</h2>
        <div className="nav-item active">My Tasks</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        <div className="card">
          <h3>Create New Task</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input className="input" placeholder="Task Title" />
            <input className="input" placeholder="Expected Output" />
            <button className="btn">Add Task</button>
          </div>
        </div>

        <div className="card">
          <h3>My Assigned Tasks</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Expected Output</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.title}</td>
                  <td>{t.expected_output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;
