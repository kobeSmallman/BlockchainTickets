// blockchain-tickets-ui/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Event from './pages/Event';
import EventDetails from './pages/EventDetails'; // Import EventDetails page
import Login from './pages/Login';
import FinishSignUp from './pages/FinishSignUp';
import AdminRegistration from './pages/AdminRegistration';
import EventManagerRegistration from './pages/EventManagerRegistration';
import RegularUserRegistration from './pages/RegularUserRegistration';
import UserHome from './pages/Home';
import EventManagerHome from './pages/EventManagerHome';
import AdminHome from './pages/AdminHome';
import Profile from './pages/Profile';
import Header from './components/Header';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/event/:eventId" element={<EventDetails />} /> {/* Add this route */}
          <Route path="/login" element={<Login />} />
          <Route path="/finishSignUp" element={<FinishSignUp />} />
          <Route path="/admin-register" element={<AdminRegistration />} />
          <Route path="/event-manager-register" element={<EventManagerRegistration />} />
          <Route path="/regular-user-register" element={<RegularUserRegistration />} />
          <Route path="/user-dashboard" element={<UserHome />} />
          <Route path="/event-manager-dashboard" element={<EventManagerHome />} />
          <Route path="/admin-dashboard" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
