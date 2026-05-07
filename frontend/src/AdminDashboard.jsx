import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard({ setUser }) {
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('student');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await axios.get('http://localhost:3000/api/users');
    setUsers(usersRes.data);
    const secRes = await axios.get('http://localhost:3000/api/sections');
    setSections(secRes.data);
    const fbRes = await axios.get('http://localhost:3000/api/feedbacks');
    setFeedbacks(fbRes.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/register', {
      username: newUsername,
      password: newPassword,
      role: newRole,
      name: newName,
      email: newEmail
    });
    setNewUsername('');
    setNewPassword('');
    setNewName('');
    setNewEmail('');
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Admin Panel</h2>
        <div className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</div>
        <div className={`nav-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Register User</div>
        <div className={`nav-item ${activeTab === 'feedbacks' ? 'active' : ''}`} onClick={() => setActiveTab('feedbacks')}>System Feedbacks</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        
        {activeTab === 'overview' && (
          <>
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
          </>
        )}

        {activeTab === 'register' && (
          <div className="card">
            <h3>Register New User</h3>
            <form onSubmit={handleRegisterUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
              <input className="input" placeholder="Full Name" value={newName} onChange={e => setNewName(e.target.value)} required />
              <input className="input" placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
              <input className="input" placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)} required />
              <input className="input" type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              <select className="input" value={newRole} onChange={e => setNewRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="admin">Admin</option>
              </select>
              <button className="btn" type="submit">Create User</button>
            </form>
          </div>
        )}

        {activeTab === 'feedbacks' && (
          <div className="card">
            <h3>User Feedbacks</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Username</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map(f => (
                  <tr key={f.id}>
                    <td>{f.date}</td>
                    <td>{f.username}</td>
                    <td>{f.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
