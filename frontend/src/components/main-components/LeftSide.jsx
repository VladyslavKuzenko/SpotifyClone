import React from "react";
import styles from "../main-page/main.module.css";
import MusicPlayer from "../sharedComponents/MusicPlayer";

const LeftSide = () => {
  return (
    <div className={styles["left-side"]}>
      <div className={styles["ava-place"]}>

        <div className={styles.avatarka}></div>
      </div>

      <div className={styles["pages-btns-div"]}>
        <button className={styles["page-btn"]}></button>
        <button className={styles["page-btn"]}></button>
        <button className={styles["page-btn"]}></button>
        <button className={styles["page-btn"]}></button>
        <button className={styles["page-btn"]}></button>
      </div>

     {/*  <div className={styles["song-place-div"]}>
        <div className={styles["song-name"]}>Not Like Us</div>
        <div className={styles.singer}>Kendrick Lamar</div>
        <div className={styles["circle-song"]}></div>
      </div> */}
      <MusicPlayer/>
    </div>
  );
};

export default LeftSide;
