import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

/* This components is the example how to use 'user' variable, that contains user data (like name, email, etc.) */
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2>Variable 'user': </h2>
      {isAuthenticated ? (
        <div>
          <p>picture: </p>
          <img src={user.picture} alt={user.name} />
          <p>name: {user.name}</p>
          <p>email: {user.email}</p>
        </div>
      ) : (
        <div>
          <p>No authenticated</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
