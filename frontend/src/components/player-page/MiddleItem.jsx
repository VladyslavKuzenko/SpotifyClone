import MiddleSongItem from "./MIddleSongItem";
import styles from "./player.module.css";
import SongItem from "./SongItem";

export default function MiddleItem({ songs, onSongSelect ,onSetCurrentAlbum}) {
  return (
    <div className={styles["mr-midd"]}>
      <div className={styles["artist-songs"]}>
        <div className={styles["as-plat1"]}>
          <div className={styles["left-right-btns"]}>
            <div className={styles["left-btn-plat"]}></div>
            <div className={styles["right-btn-plat"]}></div>
          </div>
          <div className={styles["as-search-plat"]}>
            <div className={styles["as-search"]}>Search</div>
          </div>
        </div>

        <div className={styles["as-plat2"]}>
          <div className={styles["as-empty1"]}></div>
          <div className={styles["artist-listeners"]}>
            <div className={styles["al-artist"]}>Artist</div>
            <div className={styles["al-listeners"]}>
              1 689 76 monthly listeners
            </div>
          </div>
          <div className={styles["play-follow"]}>
            <div className={styles["pf-empty1"]}></div>
            <div className={styles["pf-container"]}>
              <button className={styles["pf-play"]} onClick={()=>onSongSelect(songs[0])}>Play</button>
              <button className={styles["pf-follow"]}>Follow</button>
            </div>
          </div>
        </div>

        <div className={styles["recommended-text"]}>Recommended</div>

        <div className={styles["as-plat3"]}>
          {songs.map((i) => (
            <SongItem onSongSelect={onSongSelect} song={i} moreInfo onSetCurrentAlbum={()=>{onSetCurrentAlbum(songs)}}/>
          ))}
          {/*  {songs.map((_, i) => (
            <MiddleSongItem
              songs={songsMiddleItem}
              onSongSelect={setCurrentSong}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
