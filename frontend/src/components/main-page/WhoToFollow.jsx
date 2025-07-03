import React, { useEffect } from "react";
import styles from "./main.module.css";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";
import FollowAccountCard from "./FollowAccountCard";

const WhoToFollow = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: API_URL },
        });
        const response = await fetch(
          `http://localhost:8080/users/userByFollowers/15`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUsers(data);
        console.log("Users fetched:", data);
      }
    };
    fetchUsers();
  }, [isLoading]);
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <div className={styles["who-to-follow-div"]}>
      <div className={styles["who-to-follow-text"]}>Who to follow</div>
      <div className={styles["who-to-follow-accounts"]}>
        {users.map((i) => (
          <FollowAccountCard userToFollow={i} key={i.id} />
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
