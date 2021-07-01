import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentDashboard({ user, setUser }) {
  const [code, setCode] = useState('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
  };

  const handleRunCode = async () => {
    setStatus('Compiling...');
    try {
      const res = await axios.post('http://localhost:3000/api/execute', { 
        code, 
        expected_output: 'Hello World' 
      });
      setStatus(res.data.status);
      setOutput(res.data.output);
    } catch (err) {
      setStatus('Server Error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Student IDE</h2>
        <div className="nav-item active">Code Editor</div>
        <div className="nav-item">My Tasks</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        <div className="card">
          <h3>Task: Print Hello World in Java</h3>
          <p style={{ color: 'var(--text-muted)' }}>Write a Java program that outputs exactly "Hello World".</p>
        </div>
        
        <div className="editor-container">
          <textarea 
            className="editor" 
            value={code} 
            onChange={e => setCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn" onClick={handleRunCode}>Run & Submit Code</button>
          <div style={{ fontSize: '1.1rem' }}>
            Status: <span style={{ color: status === 'Passed' ? '#4ade80' : '#f87171', fontWeight: 'bold' }}>{status || 'Not Submitted'}</span>
          </div>
        </div>

        {output && (
          <div className="card" style={{ marginTop: '1rem', background: '#000' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>Console Output</h4>
            <pre style={{ margin: 0, color: '#fff', fontFamily: 'monospace' }}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
