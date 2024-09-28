import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Profile: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome, {user.username}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
