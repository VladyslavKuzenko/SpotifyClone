import { useEffect, useRef, useState } from "react";
import styles from "./player.module.css";
import {convertTime} from "./js/functions";

export default function AudioControl({songControl}) {
  const audioRef = useRef(null);
  const [isSongPlayed, setIsSongPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const playAudio = () => {
    audioRef.current?.play();
    setIsSongPlayed(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsSongPlayed(false);
  };
  const reduceVolume = () => {
    audioRef.current.volume - 0.1 >= 0
      ? (audioRef.current.volume -= 0.1)
      : (audioRef.current.volume = 0);
    setVolume(audioRef.current.volume);
  };
  const increaseVolume = () => {
    audioRef.current.volume + 0.1 <= 1
      ? (audioRef.current.volume += 0.1)
      : (audioRef.current.volume = 1);

    setVolume(audioRef.current.volume);
  };

  /*  const skipForward = () => {
    audioRef.current.currentTime += 10;
  };

  const skipBack = () => {
    audioRef.current.currentTime -= 10;
  }; */
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    <>
      <div className={styles["mrb-center"]}>
        <div className={styles["bmr-controls"]}>
          <audio
            id="myAudio"
            ref={audioRef}
            src={songControl.currentSong.source_url}
            onLoadedMetadata={() => {
              setDuration(Math.floor(audioRef.current.duration));
              setVolume(audioRef.current.volume);
              playAudio();
              console.log("Volume: " + audioRef.current.volume);
            }}
            onTimeUpdate={() => {
              setCurrentTime(Math.floor(audioRef.current.currentTime));
            }}
            onEnded={() => {
/*     setIsSongPlayed(false); */
              
              songControl.nextSong();
            }}
          ></audio>

          <button className={styles["bmr-btn"]}>⏺</button>
          <button className={styles["bmr-btn"]} onClick={songControl.prevSong}>
            ⏮
          </button>
          {isSongPlayed ? (
            <button className={styles["bmr-btn"]} onClick={pauseAudio}>
              ⏸
            </button>
          ) : (
            <button className={styles["bmr-btn"]} onClick={playAudio}>
              ▶
            </button>
          )}
          <button className={styles["bmr-btn"]} onClick={songControl.nextSong}>
            ⏭
          </button>
          <button className={styles["bmr-btn"]}>⏺</button>
        </div>

        <div className={styles["bmr-progress"]}>
          <div className={styles["current-time-start"]}>
            {convertTime(currentTime)}
          </div>
          <input
            className={styles["bmr-bar-wrapper"]}
            type="range"
            min="0"
            max={duration}
            step="1"
            value={currentTime}
            onChange={handleProgressChange}
          />
          <div className={styles["current-time-end"]}>
            {convertTime(duration)}
          </div>
        </div>
      </div>
      <div className={styles["mrb-right"]}>
        <button
          className={styles["bmr-plus"]}
          onClick={() => {
            reduceVolume();
          }}
        >
          -
        </button>
        {/* <div className={styles["bmr-volume-wrapper"]}>
          <div
            className={styles["bmr-volume-fill"]}
            style={{ width: "70%" }}
          ></div>
        </div> */}
        <progress id="file" value={volume} max="1"></progress>

        <button className={styles["bmr-plus"]} onClick={() => increaseVolume()}>
          +
        </button>
      </div>
    </>
  );
}
