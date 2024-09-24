// blockchain-tickets-ui/src/pages/Login/index.js

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch('https://localhost:7232/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        const { roleid } = await response.json();
        switch (roleid) {
          case 1: // Admin roleid
            navigate('/admin-dashboard');
            break;
          case 2: // Event Manager roleid
            navigate('/event-manager-dashboard');
            break;
          case 3: // Regular User roleid
            navigate('/user-dashboard');
            break;
          default:
            setError('Unknown user role');
            break;
        }
      } else {
        const errorText = await response.text();
        setError('Failed to fetch user role');
        console.error('Failed to fetch user role:', errorText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Login to Your Account</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="auth-input"
              disabled={loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-input"
              disabled={loading}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/regular-user-register">Register here</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
