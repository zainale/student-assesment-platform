import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentDashboard({ user, setUser }) {
  const [code, setCode] = useState('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeTab, setActiveTab] = useState('ide');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [myGrade, setMyGrade] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
    if (res.data.length > 0) {
      setActiveTask(res.data[0]);
    }
  };

  const handleRunCode = async () => {
    if (!activeTask) return;
    setStatus('Compiling...');
    try {
      const res = await axios.post('http://localhost:3000/api/execute', { 
        code, 
        expected_output: activeTask.expected_output,
        student_id: user.id,
        task_id: activeTask.id
      });
      setStatus(res.data.status);
      setOutput(res.data.output);
      setMyGrade(res.data.grade);
    } catch (err) {
      setStatus('Server Error');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const submitFeedback = async () => {
    if (!feedbackMsg) return;
    await axios.post('http://localhost:3000/api/feedbacks', {
      user_id: user.id,
      message: feedbackMsg
    });
    setFeedbackMsg('');
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2 className="title" style={{ fontSize: '1.5rem' }}>Student IDE</h2>
        <div className={`nav-item ${activeTab === 'ide' ? 'active' : ''}`} onClick={() => setActiveTab('ide')}>Code Editor</div>
        <div className={`nav-item ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>Give Feedback</div>
        <div className="nav-item" onClick={handleLogout}>Logout</div>
      </div>
      <div className="main-content">
        
        {activeTab === 'ide' && (
          <>
            <div className="card">
              <h3>Select Task</h3>
              <select className="input" onChange={e => setActiveTask(tasks.find(t => t.id == e.target.value))}>
                {tasks.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
              {activeTask && (
                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>{activeTask.description}</p>
              )}
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
                {myGrade !== null && <span style={{ marginLeft: '1rem' }}>Grade: {myGrade}/10</span>}
              </div>
            </div>

            {output && (
              <div className="card" style={{ marginTop: '1rem', background: '#000' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-muted)' }}>Console Output</h4>
                <pre style={{ margin: 0, color: '#fff', fontFamily: 'monospace' }}>{output}</pre>
              </div>
            )}
          </>
        )}

        {activeTab === 'feedback' && (
          <div className="card">
            <h3>System Feedback</h3>
            <p style={{ color: 'var(--text-muted)' }}>Found a bug? Have a suggestion? Let the admins know.</p>
            <textarea 
              className="input" 
              rows="5" 
              value={feedbackMsg} 
              onChange={e => setFeedbackMsg(e.target.value)} 
              placeholder="Write your feedback here..." 
            />
            <button className="btn" onClick={submitFeedback} style={{ marginTop: '1rem' }}>Submit Feedback</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentDashboard;
