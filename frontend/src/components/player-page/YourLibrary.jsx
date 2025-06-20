// YourLibraryComponent.jsx
import React, { useState } from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS-модуля
import SongItem from "./SongItem";

const YourLibrary = ({songs, onSongSelect,onSetCurrentAlbum }) => {
  

  return (
    <div className={styles["your-library"]}>
      <div className={styles["yl-empty1"]}></div>

      <div className={styles["yl-main"]}>
        <div className={styles["yl-text-plus"]}>
          <div className={styles["yl-text"]}>Your library</div>
          <div className={styles["yl-plus-plat"]}>
            <div className={styles["yl-plus"]}>+</div>
          </div>
        </div>

        <div className={styles["playlist-platform"]}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles["playlist-element"]}>
              playlist
            </div>
          ))}
        </div>

        <div className={styles["search-recent"]}>
          <div className={styles["sr-search"]}>
            
          </div>
          <div className={styles["sr-recent"]}>Recent</div>
        </div>

        <div className={styles["yl-song-container"]}>
          {songs.map((i) => (
            <SongItem onSongSelect={onSongSelect} song={i} onSetCurrentAlbum={()=>{onSetCurrentAlbum(songs)}}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourLibrary;
