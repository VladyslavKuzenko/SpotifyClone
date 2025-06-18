// PlayerComponent.jsx
import React from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS
import Audio from "./Audio";

const FooterPlayer = ({currentSong}) => {
  return (
        <div className={styles["footer-container"]}>

    <div className={styles["mr-bottom"]}>

      <div className={styles["mrb-left"]}>
        <div className={styles["bmr-cover"]}></div>
        <div className={styles["bmr-song-info"]}>
          <div className={styles["bmr-title"]}>{currentSong.title}</div>
          <div className={styles["bmr-artist"]}>{currentSong.artist}</div>
        </div>
      </div>

      <div className={styles["mrb-center"]}>
        <Audio currentSong={currentSong}/>
        <div className={styles["bmr-progress"]}>
          <div className={styles["current-time-start"]}>0:57</div>
          <div className={styles["bmr-bar-wrapper"]}>
            <div
              className={styles["bmr-bar-fill"]}
              style={{ width: "50%" }}
            ></div>
          </div>
          <div className={styles["current-time-end"]}>4:32</div>
        </div>
      </div>

      <div className={styles["mrb-right"]}>
        <div className={styles["bmr-volume-wrapper"]}>
          <div
            className={styles["bmr-volume-fill"]}
            style={{ width: "70%" }}
          ></div>
        </div>
        <div className={styles["bmr-plus"]}>+</div>
      </div>
    </div>
    </div>
  );
};

export default FooterPlayer;
