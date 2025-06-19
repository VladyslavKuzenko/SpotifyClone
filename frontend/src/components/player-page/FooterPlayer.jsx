// PlayerComponent.jsx
import React from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS
import Audio from "./AudioControl";

const FooterPlayer = ({ currentSong }) => {
  
  return (
    <div className={styles["mr-bottom"]}>
      <div className={styles["mb-empty1"]}></div>

      <div className={styles["mrb-left"]}>
        <div className={styles["bmr-cover"]}></div>
        <div className={styles["bmr-song-info"]}>
          <div className={styles["bmr-title"]}>{currentSong.title}</div>
          <div className={styles["bmr-artist"]}>{currentSong.artist}</div>
        </div>
      </div>

        <Audio currentSong={currentSong} />


    
    </div>
  );
};

export default FooterPlayer;
