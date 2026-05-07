import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Table from './components/Table';

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
    const usersRes = await axios.get('http://localhost:3005/api/users');
    setUsers(usersRes.data);
    const secRes = await axios.get('http://localhost:3005/api/sections');
    setSections(secRes.data);
    const fbRes = await axios.get('http://localhost:3005/api/feedbacks');
    setFeedbacks(fbRes.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3005/api/register', {
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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'register', label: 'Register User' },
    { id: 'feedbacks', label: 'System Feedbacks' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar title="Admin Panel" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <div className="main-content">
        {activeTab === 'overview' && (
          <>
            <Card title="Registered Users">
              <Table 
                headers={['Name', 'Username', 'Role']}
                data={users}
                renderRow={(u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.username}</td>
                    <td><span style={{ padding: '0.25rem 0.5rem', background: '#f3f4f6', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem' }}>{u.role}</span></td>
                  </tr>
                )}
              />
            </Card>

            <Card title="Sections">
              <Table 
                headers={['Section ID', 'Name', 'Lecturer ID']}
                data={sections}
                renderRow={(s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.lecturer_id}</td>
                  </tr>
                )}
              />
            </Card>
          </>
        )}

        {activeTab === 'register' && (
          <Card title="Register New User">
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
          </Card>
        )}

        {activeTab === 'feedbacks' && (
          <Card title="User Feedbacks">
            <Table 
              headers={['Date', 'Username', 'Message']}
              data={feedbacks}
              renderRow={(f) => (
                <tr key={f.id}>
                  <td>{f.date}</td>
                  <td>{f.username}</td>
                  <td>{f.message}</td>
                </tr>
              )}
            />
          </Card>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
