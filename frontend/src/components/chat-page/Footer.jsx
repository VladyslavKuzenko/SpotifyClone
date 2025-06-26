import React from "react";
import styles from "./ChatPage.module.css";

const Footer = () => {
  return (
    <div className={styles["bottom-side"]}>
      <input
        type="text"
        className={styles["send-message"]}
        placeholder="Message..."
      />
      <div className={styles["send-message-menu"]}>
        <button className={styles["circle-plat"]}>
          <div className={styles.circle}></div>
        </button>
        <button className={styles["micro-plat"]}>
          <div className={styles.micro}></div>
        </button>
        <button className={styles["gallery-plat"]}>
          <div className={styles.gallery}></div>
        </button>
        <button className={styles["file-plat"]}>
          <div className={styles.file}></div>
        </button>
        <button className={styles["music-plat"]}>
          <div className={styles.music}></div>
        </button>
      </div>
    </div>
  );
};

export default Footer;
