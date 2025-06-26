// SongItem.jsx
import React, { useEffect, useState } from "react";
import styles from "./player.module.css"; // або шлях до глобального стилю, якщо не CSS Modules
import { convertTime } from "./js/functions";

const SongItem = ({ onSongSelect, song, moreInfo, onSetCurrentAlbum }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    console.log("song: ")
    console.log(song)
    const audio = new Audio();
    audio.src = song.sourceUrl;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(audio.duration));
    });
  });
  return (
    <button
      className={styles["song-item"]}
      onClick={() => {
        onSongSelect(song);
        onSetCurrentAlbum();
      }}
    >
      <div className={styles.cover}></div>
      <div className={styles.info}>
        <div className={styles.title}>{song.title}</div>
        {/* <div className={styles.artist}>{song.artist}</div> */}
      </div>
      {moreInfo ? (
        <>
          <div className={styles["as-listeners-count"]}>
            {song.listeningCount}
          </div>
          <div className={styles["as-plus-plat"]}>
            <div className={styles["as-plus"]}>+</div>
          </div>
          <div className={styles.duration}>{convertTime(duration)}</div>
            <div className={styles['as-more-menu']}>
                <div className={styles['as-menu-plat']}>
                    <div className={styles['as-mp-circle']}></div>
                    <div className={styles['as-mp-circle']}></div>
                    <div className={styles['as-mp-circle']}></div>
                </div>
            </div>
        </>
      ) : (
        <div className={styles.duration}>{convertTime(duration)}</div>
      )}
    </button>
  );
};

export default SongItem;
