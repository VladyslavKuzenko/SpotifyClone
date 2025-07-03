import styles from "./main.module.css";
import FollowingButton from "../sharedComponents/FollowingButton";
export default function FollowAccountCard({ userToFollow }) {  
  return (
    <div className={styles["account-platform"]}>
      <div className={styles["place-for-ava"]}>
        <div className={styles["ava-follow"]}></div>
      </div>
      <div className={styles["name-nickname"]}>
        <div className={styles["name-follow"]}>
          {userToFollow.firstName} {userToFollow.lastName}
        </div>
        <div className={styles["nickname-follow"]}>{userToFollow.username}</div>
      </div>
      <FollowingButton userToFollow={userToFollow} styles={styles["follow-btn"]}/>
    </div>
  );
}
