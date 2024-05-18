// src/pages/FinishSignUp/index.js
import React, { useEffect } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const FinishSignUp = () => {
  useEffect(() => {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem('emailForSignIn');
          const idToken = await result.user.getIdToken();
          // Send the ID token to the backend for verification
          const response = await fetch('/api/user/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(idToken)
          });
          const data = await response.json();
          console.log('Verified ID Token:', data);
        })
        .catch((error) => {
          console.error('Error signing in with email link', error);
        });
    }
  }, []);

  return <div>Signing you in...</div>;
};

export default FinishSignUp;
