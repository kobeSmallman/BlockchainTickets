import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import './styles.css';

const FinishSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:5171/api/user/create-regularuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          uid: user.uid,
          username: username,
          email: email,
          role: 'Regular User', // Hardcoded role as 'Regular User' for now
          passwordHash: password
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('User registered successfully:', responseData);
        alert('User registered successfully!');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to save additional user info: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>Finish Sign Up</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="auth-input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="auth-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="auth-input"
      />
      <button onClick={handleRegister} className="auth-button">Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FinishSignUp;
