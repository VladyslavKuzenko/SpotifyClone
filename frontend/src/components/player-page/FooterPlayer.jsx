// PlayerComponent.jsx
import React from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS
import AudioControl from "./AudioControl";

//const FooterPlayer = ({ currentSong,nextSong,prevSong }) => {
const FooterPlayer = ({ songControl }) => {
  
  return (
    <div className={styles["mr-bottom"]}>
      <div className={styles["mb-empty1"]}></div>

      <div className={styles["mrb-left"]}>
        <div className={styles["bmr-cover"]}></div>
        <div className={styles["bmr-song-info"]}>
          <div className={styles["bmr-title"]}>{songControl.currentSong.title}</div>
          {/* <div className={styles["bmr-artist"]}>{songControl.currentSong.artist}</div> */}
        </div>
      </div>

        <AudioControl  songControl={{ currentSong:songControl.currentSong, nextSong:songControl.nextSong, prevSong:songControl.prevSong }}/>


    
    </div>
  );
};

export default FooterPlayer;
