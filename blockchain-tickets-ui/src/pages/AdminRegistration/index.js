import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import './styles.css';

const AdminRegistration = () => {
  const [email, setEmail] = useState('test@test.com'); // Hardcoded admin email
  const [password, setPassword] = useState('Password1'); // Hardcoded admin password
  const [username, setUsername] = useState('Admin4'); // Hardcoded admin username
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();

      const response = await fetch('https://localhost:7232/api/user/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          uid: user.uid,
          username: username,
          email: email,
          roleid: 1, // Hardcoded roleId for Admin
          passwordhash: password
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Admin registered successfully:', responseData);
        alert('Admin registered successfully!');
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
      <h1>Admin Registration</h1>
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

export default AdminRegistration;
