// SongItem.jsx
import React from "react";
import styles from "./player.module.css"; // або шлях до глобального стилю, якщо не CSS Modules

const SongItem = ({onSongSelect,song }) => {
  return (
    <button className={styles["song-item"]} onClick={()=>{onSongSelect(song)}}>
      <div className={styles.cover}></div>
      <div className={styles.info}>
        <div className={styles.title}>{song.title}</div>
        <div className={styles.artist}>{song.artist}</div>
      </div>
      <div className={styles.duration}>{song.duration}</div>
    </button>
  );
};

export default SongItem;
