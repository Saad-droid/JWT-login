
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuccessPage from './Components/Success';
import Login from './Components/Login';
import FailedPage from './Components/Failed';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failed" element={<FailedPage />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
