// SongItem.jsx
import React from "react";
import styles from "./player.module.css"; // або шлях до глобального стилю, якщо не CSS Modules

const SongItem = ({ title = "Song title", artist = "Artist", duration = "2:56" }) => {
  return (
    <button className={styles["song-item"]}>
      <div className={styles.cover}></div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.artist}>{artist}</div>
      </div>
      <div className={styles.duration}>{duration}</div>
    </button>
  );
};

export default SongItem;
