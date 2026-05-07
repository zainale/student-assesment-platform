import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerDashboard({ user, setUser }) {
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState('tasks');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resTasks = await axios.get('http://localhost:3000/api/tasks');
    setTasks(resTasks.data.filter(t => t.lecturer_id === user.id));

    const resSubs = await axios.get('http://localhost:3000/api/submissions');
    setSubmissions(resSubs.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleAddTask = async () => {
    await axios.post('http://localhost:3000/api/tasks', {
      title,
      description,
      expected_output: expectedOutput,
      lecturer_id: user.id,
      section_id: 1 // Default section for demo
    });
    setTitle('');
    setDescription('');
    setExpectedOutput('');
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Lecturer Panel</h2>
        <div className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>My Tasks</div>
        <div className={`nav-item ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => setActiveTab('submissions')}>Student Submissions</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        
        {activeTab === 'tasks' && (
          <>
            <div className="card">
              <h3>Create New Task</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
                <input className="input" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className="input" placeholder="Task Description" value={description} onChange={e => setDescription(e.target.value)} rows="3" />
                <input className="input" placeholder="Expected Output" value={expectedOutput} onChange={e => setExpectedOutput(e.target.value)} />
                <button className="btn" onClick={handleAddTask}>Add Task</button>
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
          </>
        )}

        {activeTab === 'submissions' && (
          <div className="card">
            <h3>Student Submissions & Rankings</h3>
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Task Title</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(s => (
                  <tr key={s.id}>
                    <td>{s.username}</td>
                    <td>{s.title}</td>
                    <td style={{ color: s.status === 'Passed' ? '#4ade80' : '#f87171' }}>{s.status}</td>
                    <td>{s.grade}/10</td>
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

export default LecturerDashboard;
