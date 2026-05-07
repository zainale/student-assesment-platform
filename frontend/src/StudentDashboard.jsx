import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Card from './components/Card';

function StudentDashboard({ user, setUser }) {
  const [code, setCode] = useState('public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeTab, setActiveTab] = useState('ide');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [myGrade, setMyGrade] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3005/api/tasks');
    setTasks(res.data);
    if (res.data.length > 0) {
      setActiveTask(res.data[0]);
    }
  };

  const handleRunCode = async () => {
    if (!activeTask) return;
    setIsRunning(true);
    setStatus('Compiling & Executing on Judge0...');
    try {
      const res = await axios.post('http://localhost:3005/api/execute', { 
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
    setIsRunning(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const submitFeedback = async () => {
    if (!feedbackMsg) return;
    await axios.post('http://localhost:3005/api/feedbacks', {
      user_id: user.id,
      message: feedbackMsg
    });
    setFeedbackMsg('');
    alert('Feedback submitted successfully!');
  };

  const tabs = [
    { id: 'ide', label: 'Code Editor' },
    { id: 'feedback', label: 'Give Feedback' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar title="Student IDE" tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      
      <div className="main-content">
        {activeTab === 'ide' && (
          <div className="ide-layout">
            <div className="editor-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <select className="input" style={{ width: 'auto', margin: 0 }} onChange={e => setActiveTask(tasks.find(t => t.id == e.target.value))}>
                  {tasks.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
                <button className="btn" onClick={handleRunCode} disabled={isRunning}>
                  {isRunning ? 'Running...' : 'Run & Submit (Judge0)'}
                </button>
              </div>
              <div className="editor-container">
                <textarea 
                  className="editor" 
                  value={code} 
                  onChange={e => setCode(e.target.value)}
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="io-section">
              <Card title="Task Info">
                {activeTask ? (
                  <>
                    <p style={{ color: 'var(--text-muted)' }}>{activeTask.description}</p>
                    <div style={{ marginTop: '1rem' }}>
                      <strong>Status:</strong> <span style={{ color: status === 'Passed' ? '#10b981' : (status ? '#f87171' : 'var(--text-muted)') }}>{status || 'Not Submitted'}</span>
                    </div>
                    {myGrade !== null && (
                      <div><strong>Grade:</strong> {myGrade}/10</div>
                    )}
                  </>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No task selected.</p>
                )}
              </Card>

              <Card title="Console Output" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="terminal-output">
                  {output || 'Output will appear here after execution...'}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <Card title="System Feedback">
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Found a bug? Have a suggestion? Let the admins know.</p>
            <textarea 
              className="input" 
              rows="5" 
              value={feedbackMsg} 
              onChange={e => setFeedbackMsg(e.target.value)} 
              placeholder="Write your feedback here..." 
            />
            <button className="btn" onClick={submitFeedback} style={{ marginTop: '1rem' }}>Submit Feedback</button>
          </Card>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
