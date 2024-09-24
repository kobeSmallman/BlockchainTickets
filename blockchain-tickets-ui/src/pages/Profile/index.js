import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import './styles.css';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [username, setUsername] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');

  const handleUpdate = async () => {
    try {
      await updateUser({ displayName: username, photoURL });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
        />
        <button onClick={handleUpdate}>Update Profile</button>
      </div>
    </div>
  );
};

export default Profile;
