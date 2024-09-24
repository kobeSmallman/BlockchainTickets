import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from './firebaseconfig';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setCurrentUser({ ...user, role: token.claims.role });
      } else {
        setCurrentUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const updateUser = async (userDetails) => {
    if (currentUser) {
      await currentUser.updateProfile(userDetails);
      setCurrentUser({ ...currentUser, ...userDetails });
    }
  };

  const value = {
    currentUser,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
