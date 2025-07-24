import { useEffect, useState } from "react";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { isSubscribed } from "../../js/functions/functions";
import { useAPI } from "../../hooks/useApi";

export default function FollowingButton({ userToFollow, styles }) {
  const { isAuthenticated } = useAuth0();
  const [isFollowed, setIsFollowed] = useState(false);
  const { apiFetch,user } = useAPI();
  useEffect(() => {
    const checkFollowed = async () => {
      if (isAuthenticated && user && userToFollow) {
        const subscribed = await isSubscribed(user, userToFollow, apiFetch);
        setIsFollowed(subscribed);
      }
    };
    checkFollowed();
  });
  const handleFollow = async () => {
    const response = await apiFetch(
      `/users/follow/${user.sub}/${userToFollow.id}`,
      { method: isFollowed ? "DELETE" : "POST" }
    );

    console.log(response);
    if (response.ok) {
      setIsFollowed(!isFollowed);
    } else {
      console.error("Failed to follow/unfollow the artist");
    }
  };

  return (
    <button
      className={styles}
      onClick={handleFollow}
      style={{ backgroundColor: isFollowed ? "#232643" : "#414CC0" }}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
