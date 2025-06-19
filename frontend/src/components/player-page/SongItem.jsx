// SongItem.jsx
import React, { useEffect, useState } from "react";
import styles from "./player.module.css"; // або шлях до глобального стилю, якщо не CSS Modules
import convertTime from "./convertTime";

const SongItem = ({ onSongSelect, song }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const audio = new Audio();
    audio.src = song.source_url;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(audio.duration));
      console.log(duration);
    });
  });
  return (
    <button
      className={styles["song-item"]}
      onClick={() => {
        onSongSelect(song);
      }}
    >
      <div className={styles.cover}></div>
      <div className={styles.info}>
        <div className={styles.title}>{song.title}</div>
        <div className={styles.artist}>{song.artist}</div>
      </div>
      <div className={styles.duration}>{convertTime(duration)}</div>
    </button>
  );
};

export default SongItem;
