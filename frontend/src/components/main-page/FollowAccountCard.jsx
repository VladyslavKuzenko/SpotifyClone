import styles from "./main.module.css";
import FollowingButton from "../sharedComponents/FollowingButton";
import { useAPI } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
export default function FollowAccountCard({ userToFollow }) {
  const navigate = useNavigate();
  const {user}=useAPI();
  return (
    <div className={styles["account-platform"]}>
      <div
        className={styles["place-for-ava"]}
        onClick={() => {
          if (userToFollow.id === user.sub) {
            navigate(`/my-profile`);
          } else navigate(`/user-profile/${userToFollow.id}`);
        }}
      >
        <img
          className={styles["ava-follow"]}
          src={userToFollow.avatarImgUrl}
          alt=""
        />
      </div>
      <div className={styles["name-nickname"]}>
        <div className={styles["name-follow"]}>
          {userToFollow.firstName} {userToFollow.lastName}
        </div>
        <div className={styles["nickname-follow"]}>
          @{userToFollow.username}
        </div>
      </div>

      <FollowingButton
        userToFollow={userToFollow}
        styles={styles["follow-btn"]}
      />
    </div>
  );
}
