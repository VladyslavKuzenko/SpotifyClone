import React from "react";
import styles from "./main.module.css";

const WhoToFollow = () => {
  return (
    <div className={styles["who-to-follow-div"]}>
      <div className={styles["who-to-follow-text"]}>Who to follow</div>
      <div className={styles["who-to-follow-accounts"]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div className={styles["account-platform"]} key={index}>
            <div className={styles["place-for-ava"]}>
              <div className={styles["ava-follow"]}></div>
            </div>
            <div className={styles["name-nickname"]}>
              <div className={styles["name-follow"]}>Name follow</div>
              <div className={styles["nickname-follow"]}>@nickname-follow</div>
            </div>
            <button className={styles["follow-btn"]}>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
