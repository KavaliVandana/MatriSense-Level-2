import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HealthRisk from './pages/HealthRisk';
import Food from './pages/Food';
import Exercise from './pages/Exercise';
import Login from './pages/Login';
import Landing from './pages/Landing'; // ✅ Import Landing component
import ChatBot from './components/ChatBot/ChatBot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> {/* ✅ Landing set to default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/healthrisk" element={<HealthRisk />} />
        <Route path="/food" element={<Food />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
