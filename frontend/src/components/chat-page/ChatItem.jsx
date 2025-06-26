import React from "react";
import styles from "./ChatPage.module.css";

const ChatItem = ({ name, message }) => {
  return (
    <div className={styles["chat-item"]}>
      <div className={styles["ava-circle-place"]}>
        <div className={styles["ava-circle"]}>
          <div className={styles.status}></div>
        </div>
      </div>
      <div className={styles["name-message"]}>
        <div className={styles["chat-name"]}>Name Surname</div>
        <div className={styles["chat-message"]}>It might be very important message mmmmmmmmmmmmmm</div>
      </div>
      <div className={styles["settings-platform"]}>
        <button className={styles.settings}>
          <div className={styles.mcircle}></div>
          <div className={styles.mcircle}></div>
          <div className={styles.mcircle}></div>
        </button>
      </div>
    </div>
  );
};

export default ChatItem;
