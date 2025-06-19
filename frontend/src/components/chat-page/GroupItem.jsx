import React from "react";
import styles from "./ChatPage.module.css";

const GroupItem = ({ groupName }) => {
  return (
    <div className={styles["group-icon"]}>
      <div className={styles["group-circle"]}></div>
      <div className={styles["group-name"]}>Group Name</div>
    </div>
  );
};

export default GroupItem;
