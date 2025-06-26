import React from "react";
import styles from "./ChatPage.module.css"; 

const UpperContent = () => {
    return (
        <div className={styles["upper-content"]}>
            <div className={styles["user-ava"]}></div>
            <div className={styles["user-ns"]}>
                <div className={styles["user-name"]}>User Nickname</div>
                <div className={styles["user-status"]}>Online</div>
            </div>
            <div className={styles["user-listening"]}>
                Listening to: Timeless – The Weeknd
            </div>
            <div className={styles["user-btn"]}>∨</div>
        </div>
    );
};

export default UpperContent;
