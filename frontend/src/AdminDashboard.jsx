import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard({ setUser }) {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await axios.get('http://localhost:3000/api/users');
    setUsers(usersRes.data);
    const secRes = await axios.get('http://localhost:3000/api/sections');
    setSections(secRes.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Admin Panel</h2>
        <div className="nav-item active">Overview</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        <div className="card">
          <h3>Registered Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Sections</h3>
          <table>
            <thead>
              <tr>
                <th>Section ID</th>
                <th>Name</th>
                <th>Lecturer ID</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.lecturer_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
