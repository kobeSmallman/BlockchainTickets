import React, { useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../firebaseconfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const actionCodeSettings = {
    url: 'http://localhost:3000/finishSignUp',
    handleCodeInApp: true,
    iOS: { bundleId: 'com.example.ios' },
    android: { packageName: 'com.example.android', installApp: true, minimumVersion: '12' },
    dynamicLinkDomain: 'example.page.link'
  };

  const handleLogin = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      alert('Email sent!');
    } catch (error) {
      console.error(error);
      alert('Error sending email');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleLogin}>Send Login Link</button>
    </div>
  );
};

export default Login;
