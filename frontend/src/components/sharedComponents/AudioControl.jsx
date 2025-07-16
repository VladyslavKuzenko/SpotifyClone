import { useEffect, useRef, useState } from "react";
import stylesPlayer from "../player-page/player.module.css";
import { convertTime } from "../../js/functions/functions";
import { useAPI } from "../../hooks/useApi";
import styles from "../player-page/player.module.css";
import { useAudio } from "../../hooks/useAudio";

export default function AudioControl({ footerPlayer, isHovered }) {
  const { currentSong, nextSong, prevSong, audioRef } = useAudio();
  const { isSongPlayed, setIsSongPlayed } = useAudio();
  const { currentTime, setCurrentTime } = useAudio();
  const { duration, setDuration } = useAudio();
  const { volume, setVolume } = useAudio();
  const { playAudio, pauseAudio } = useAudio();
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

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const visibleStyle = {
    opacity: 1,
    visibility: "visible",
    transition: "opacity 0.3s ease",
  };
  const hiddenStyle = {
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease",
  };
  return (
    <>
      {footerPlayer ? (
        <>
          <div className={stylesPlayer["mrb-center"]}>
            <div className={stylesPlayer["bmr-controls"]}>

              <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn0"]}`} /* onClick={''} */></button>

              <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn1"]}`} onClick={prevSong}></button>

              {isSongPlayed ? (
                <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn2"]}`} onClick={pauseAudio}></button>
              ) : (
                <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn3"]}`} onClick={playAudio}></button>

              )}
              <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn4"]}`} onClick={nextSong}></button>
              <button className={`${stylesPlayer["bmr-btn"]} ${styles["btn5"]}`} /* onClick={''} */></button>

            </div>

            <div className={stylesPlayer["bmr-progress"]}>
              <div className={stylesPlayer["current-time-start"]}>
                {convertTime(currentTime)}
              </div>
              <input
                className={stylesPlayer["bmr-bar-wrapper"]}
                type="range"
                min="0"
                max={duration}
                step="1"
                value={currentTime}
                onChange={handleProgressChange}
              />
              <div className={stylesPlayer["current-time-end"]}>
                {convertTime(duration)}
              </div>
            </div>

          </div>
          <div className={stylesPlayer["mrb-right"]}>
            <button
              className={stylesPlayer["bmr-plus"]}
              onClick={() => {
                reduceVolume();
              }}
            >
              -
            </button>

            <progress id="file" value={volume} max="1"></progress>

            <button
              className={stylesPlayer["bmr-plus"]}
              onClick={() => increaseVolume()}
            >
              +
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={stylesPlayer["mrb-centerls"]}>
            <div className={stylesPlayer["bmr-controls"]}>
              {/* Додано style для керування видимістю */}
              <button
                className={`${stylesPlayer["bmr-btn"]} ${stylesPlayer["btn1ls"]}`}
                onClick={prevSong}
                style={isHovered ? visibleStyle : hiddenStyle} // Додано показ при наведенні
              >
              </button>

              {isSongPlayed ? (
                <div className={stylesPlayer["ls-wrap"]}>

                  <button
                    className={`${stylesPlayer["bmr-btn"]} ${stylesPlayer["btn2ls"]}`}
                    onClick={pauseAudio}>
                  </button>
                </div>
              ) : (
                <div className={stylesPlayer["ls-wrap"]}>
                  <button
                    className={`${stylesPlayer["bmr-btn"]} ${stylesPlayer["btn3ls"]}`}
                    onClick={playAudio}
                  // Додано показ при наведенні
                  >
                  </button>
                </div>

              )}

              <button
                className={`${stylesPlayer["bmr-btn"]} ${stylesPlayer["btn4ls"]}`}
                onClick={nextSong}
                style={isHovered ? visibleStyle : hiddenStyle} // Додано показ при наведенні
              >
              </button>
            </div>

            <div className={stylesPlayer["bmr-progress"]}>
              <input
                type="range"
                min="0"
                max={duration}
                step="1"
                value={currentTime}
                onChange={handleProgressChange}
                className={stylesPlayer["bmr-bar-wrapper1"]}
                style={isHovered ? visibleStyle : hiddenStyle} // Додано показ при наведенні
              />
            </div>
          </div>

        </>
      )}
    </>
  );
}
