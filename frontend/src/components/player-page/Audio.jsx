import { useEffect, useRef, useState } from "react";
import styles from "./player.module.css";

export default function Audio({ currentSong }) {
 const audioRef = useRef(null);
  const [isSongPlayed, setIsSongPlayed] = useState(false);

  const playAudio = () => {
    audioRef.current?.play();
    setIsSongPlayed(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsSongPlayed(false);
  };

  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBack = () => {
    audioRef.current.currentTime -= 10;
  };
  return (
    <div className={styles["bmr-controls"]}>
      <audio id="myAudio" ref={audioRef} src={currentSong.source_url}></audio>

      <button className={styles["bmr-btn"]}>⏺</button>
      <button className={styles["bmr-btn"]}>⏮</button>
      {isSongPlayed ? (
        <button className={styles["bmr-btn"]} onClick={pauseAudio}>
          ⏸
        </button>
      ) : (
        <button className={styles["bmr-btn"]} onClick={playAudio}>
          ▶
        </button>
      )}
      <button className={styles["bmr-btn"]}>⏭</button>
      <button className={styles["bmr-btn"]}>⏺</button>
    </div>
  );
}
