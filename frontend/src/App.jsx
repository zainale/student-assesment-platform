import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import LecturerDashboard from './LecturerDashboard';
import StudentDashboard from './StudentDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login setUser={setUser} /> : <Navigate to={`/${user.role}`} />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminDashboard setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/lecturer" element={user && user.role === 'lecturer' ? <LecturerDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/student" element={user && user.role === 'student' ? <StudentDashboard user={user} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
