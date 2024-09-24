// blockchain-tickets-ui/src/pages/RegularUserRegistration/index.js

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import './styles.css';

const RegularUserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const response = await fetch('https://localhost:7232/api/user/create-regularuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          username: username,
          email: email,
          roleid: 3, // Hardcoded roleId for Regular User
          passwordhash: password,
        }),
      });

      if (response.ok) {
        console.log('Regular user registered successfully');
        navigate('/user-dashboard');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to save additional user info: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Create Your Account</h1>
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="auth-input"
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegularUserRegistration;
