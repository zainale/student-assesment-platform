import React, { useState } from 'react';
import axios from 'axios';
import Card from './components/Card';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3005/api/login', { username, password, role });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center' }}>
      <Card style={{ width: '400px', textAlign: 'center', padding: '3rem 2rem' }}>
        <h1 className="title" style={{ fontSize: '2.5rem' }}>Assessment Portal</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Sign in to continue</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <select className="input" value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
            <option value="admin">Admin</option>
          </select>
          <input 
            className="input"
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
          />
          <input 
            className="input"
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          {error && <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>{error}</p>}
          <button className="btn" style={{ width: '100%', marginTop: '1rem' }} type="submit">Login</button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
