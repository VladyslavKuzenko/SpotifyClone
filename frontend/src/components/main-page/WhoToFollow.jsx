import React, { useEffect } from "react";
import styles from "./main.module.css";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FollowAccountCard from "./FollowAccountCard";
import { useAPI } from "../../hooks/useApi";

const WhoToFollow = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [users, setUsers] = React.useState([]);
  const { apiFetch, user } = useAPI();

  const fetchUsers = async () => {
    // const response = await apiFetch("/users/usersToSubscribe/15");
    const response = await apiFetch(`/users/usersToSubscribe/15/${user.sub}`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className={styles["who-to-follow-div"]}>
      <div className={styles["who-to-follow-text"]}>Who to follow</div>
      <div className={styles["who-to-follow-accounts"]}>
        {users.map((i) => (
          <>
            {i.id !== user.sub && (
              <FollowAccountCard userToFollow={i} key={i.id} />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
