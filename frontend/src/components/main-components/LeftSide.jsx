import React from "react";
import styles from "../main-page/main.module.css";

const LeftSide = () => {
  return (
    <div className={styles["left-side"]}>
      <div className={styles["ava-place"]}>
        <div className={styles.avatarka}></div>
      </div>

      <div className={styles["pages-btns-div"]}>
        <div className={styles["btns-div"]}>
          <div className={styles["page-btn"]}></div>
          <div className={styles["page-btn"]}></div>
          <div className={styles["page-btn"]}></div>
          <div className={styles["page-btn"]}></div>
          <div className={styles["page-btn"]}></div>
        </div>
      </div>

      <div className={styles["song-place-div"]}>
        <div className={styles["song-div"]}>
          <div className={styles["song-name"]}>Not Like Us</div>
          <div className={styles.singer}>Kendrick Lamar</div>
          <div className={styles["circle-song"]}></div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
