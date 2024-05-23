import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import './styles.css';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      let email = identifier;

      if (!identifier.includes('@')) {
        const response = await fetch(`/api/user/getEmailByUsername/${identifier}`);
        if (response.ok) {
          const data = await response.json();
          email = data.email;
        } else {
          throw new Error('Failed to fetch email by username');
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Enter your username or email"
        className="auth-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="auth-input"
      />
      <button onClick={handleLogin} className="auth-button">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
