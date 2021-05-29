import React, { useState } from 'react';
import axios from 'axios';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', { username, password, role });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div className="card" style={{ width: '400px' }}>
        <h1 className="title" style={{ textAlign: 'center' }}>Student Assessment</h1>
        <form onSubmit={handleLogin}>
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
          {error && <p style={{ color: '#ef4444' }}>{error}</p>}
          <button className="btn" style={{ width: '100%', marginTop: '1rem' }} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
