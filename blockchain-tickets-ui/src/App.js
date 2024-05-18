import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Login from "./pages/Login";


const App = () => {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<Event />} />
          <Route path="/login" element={<Login />} />
        </Routes>
     
    </Router>
  );
};

export default App;
