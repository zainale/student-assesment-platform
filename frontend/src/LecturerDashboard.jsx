import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import Table from './components/Table';

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
    const resTasks = await axios.get('http://localhost:3005/api/tasks');
    setTasks(resTasks.data.filter(t => t.lecturer_id === user.id));

    const resSubs = await axios.get('http://localhost:3005/api/submissions');
    setSubmissions(resSubs.data);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const handleAddTask = async () => {
    await axios.post('http://localhost:3005/api/tasks', {
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

  const tabs = [
    { id: 'tasks', label: 'My Tasks' },
    { id: 'submissions', label: 'Student Submissions' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar title="Lecturer Panel" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <div className="main-content">
        {activeTab === 'tasks' && (
          <>
            <Card title="Create New Task">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
                <input className="input" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea className="input" placeholder="Task Description" value={description} onChange={e => setDescription(e.target.value)} rows="3" />
                <input className="input" placeholder="Expected Output (from Judge0)" value={expectedOutput} onChange={e => setExpectedOutput(e.target.value)} />
                <button className="btn" onClick={handleAddTask}>Add Task</button>
              </div>
            </Card>

            <Card title="My Assigned Tasks">
              <Table 
                headers={['ID', 'Title', 'Expected Output']}
                data={tasks}
                renderRow={(t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.title}</td>
                    <td style={{ fontFamily: 'monospace', color: '#10b981' }}>{t.expected_output}</td>
                  </tr>
                )}
              />
            </Card>
          </>
        )}

        {activeTab === 'submissions' && (
          <Card title="Student Submissions & Rankings">
            <Table 
              headers={['Student', 'Task Title', 'Status', 'Grade']}
              data={submissions}
              renderRow={(s) => (
                <tr key={s.id}>
                  <td>{s.username}</td>
                  <td>{s.title}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: s.status === 'Passed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                      color: s.status === 'Passed' ? '#10b981' : '#f87171',
                      borderRadius: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>{s.grade}/10</td>
                </tr>
              )}
            />
          </Card>
        )}

      </div>
    </div>
  );
}

export default LecturerDashboard;
