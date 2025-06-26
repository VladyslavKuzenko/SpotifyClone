import React from "react";
import styles from "./main.module.css";

const NewSongs = () => {
  return (
    <div className={styles["new-song-div"]}>
      <div className={styles["ns-text1"]}>New</div>
      <div className={styles["ns-middle"]}></div>
      <div className={styles["ns-bottom"]}>
        <div className={styles["ns-song-author"]}>
          <div className={styles["ns-song"]}>Harlequin</div>
          <div className={styles["ns-author"]}>Lady Gaga</div>
        </div>
        <div className={styles["ns-play-btn-div"]}>
          <div className={styles["ns-play-btn"]}></div>
        </div>
      </div>
    </div>
  );
};

export default NewSongs;
