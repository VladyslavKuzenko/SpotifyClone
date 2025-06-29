import { useEffect, useState } from "react";
import { searchSongs } from  "../../js/functions/functions";
import MiddleSongItem from "./MIddleSongItem";
import styles from "./player.module.css";
import SongItem from "./SongItem";

export default function MiddleItem({
  songsList,
  onSongSelect,
  onSetCurrentAlbum,
  artist
}) {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState(songsList);
  useEffect(()=>{
    setSongs(songsList)
    console.log("MiddleItem")
    console.log(songsList)
    console.log(songs)
  },[songsList])
  return (
    <div className={styles["mr-midd"]}>
      <div className={styles["artist-songs"]}>
        <div className={styles["as-plat1"]}>
          <div className={styles["left-right-btns"]}>
            <div className={styles["left-btn-plat"]}></div>
            <div className={styles["right-btn-plat"]}></div>
          </div>
          <div className={styles["as-search-plat"]}>
            <input
              className={styles["as-search"]}
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
                searchSongs(songsList, e.target.value, setSongs);
              }}
              value={search}
            />
          </div>
        </div>

        <div className={styles["as-plat2"]}>
          <div className={styles["as-empty1"]}></div>
          <div className={styles["artist-listeners"]}>
            <div className={styles["al-artist"]}>{artist.firstName} {artist.lastName}</div>
            <div className={styles["al-listeners"]}>
              {artist.monthlyListner} monthly listeners
            </div>
          </div>
          <div className={styles["play-follow"]}>
            <div className={styles["pf-empty1"]}></div>
            <div className={styles["pf-container"]}>
              <button
                className={styles["pf-play"]}
                onClick={() => {
                  onSongSelect(songs[0]);
                  onSetCurrentAlbum(songs);
                }}
              >
                Play
              </button>
              <button className={styles["pf-follow"]}>Follow</button>
            </div>
          </div>
        </div>

        <div className={styles["recommended-text"]}>Recommended</div>

        <div className={styles["as-plat3"]}>
          {songs.map((i) => (
            <SongItem
              onSongSelect={onSongSelect}
              song={i}
              moreInfo
              onSetCurrentAlbum={() => {
                onSetCurrentAlbum(songs);
              }}
            />
          ))}
       
        </div>
      </div>
    </div>
  );
}
