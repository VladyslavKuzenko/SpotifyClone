import { useEffect, useRef, useState } from "react";
import stylesPlayer from "../player-page/player.module.css";
import { convertTime } from "../../js/functions/functions";
import { useAPI } from "../../hooks/useApi";

export default function AudioControl({ footerPlayer }) {
  const { currentSong, nextSong, prevSong, audioRef } = useAPI();
  const {isSongPlayed, setIsSongPlayed} = useAPI();
  const {currentTime, setCurrentTime} = useAPI();
  const {duration, setDuration} = useAPI();
  const {volume, setVolume} = useAPI();
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

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return (
    <>
      {footerPlayer ? (
        <>
          <div className={stylesPlayer["mrb-center"]}>
            <div className={stylesPlayer["bmr-controls"]}>
              <audio
                id="myAudio"
                ref={audioRef}
                src={currentSong.sourceUrl}
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

                  nextSong();
                }}
              ></audio>

              <button className={stylesPlayer["bmr-btn"]} onClick={prevSong}>
                ⏮
              </button>
              {isSongPlayed ? (
                <button
                  className={stylesPlayer["bmr-btn"]}
                  onClick={pauseAudio}
                >
                  ⏸
                </button>
              ) : (
                <button className={stylesPlayer["bmr-btn"]} onClick={playAudio}>
                  ▶
                </button>
              )}
              <button className={stylesPlayer["bmr-btn"]} onClick={nextSong}>
                ⏭
              </button>
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
          <div className={stylesPlayer["mrb-center"]}>
            <div className={stylesPlayer["bmr-controls"]}>
              <audio
                id="myAudio"
                ref={audioRef}
                src={currentSong.sourceUrl}
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

                  nextSong();
                }}
              ></audio>

              <button className={stylesPlayer["bmr-btn"]}>⏺</button>
              <button className={stylesPlayer["bmr-btn"]} onClick={prevSong}>
                ⏮
              </button>
              {isSongPlayed ? (
                <button
                  className={stylesPlayer["bmr-btn"]}
                  onClick={pauseAudio}
                >
                  ⏸
                </button>
              ) : (
                <button className={stylesPlayer["bmr-btn"]} onClick={playAudio}>
                  ▶
                </button>
              )}
              <button className={stylesPlayer["bmr-btn"]} onClick={nextSong}>
                ⏭
              </button>
              <button className={stylesPlayer["bmr-btn"]}>⏺</button>
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
      )}
    </>
  );
}
