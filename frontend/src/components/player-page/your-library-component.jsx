// YourLibraryComponent.jsx
import React from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS-модуля
import SongItem from './song-item';

const YourLibraryComponent = () => {
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
          <div className={styles["sr-search"]}>Search</div>
          <div className={styles["sr-recent"]}>Recent</div>
        </div>

        <div className={styles["yl-song-container"]}>
          {[...Array(9)].map((_, i) => (
            <SongItem/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourLibraryComponent;
