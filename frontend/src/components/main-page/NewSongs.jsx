import React, { use, useState } from "react";
import styles from "./main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";

const NewSongs = () => {
  const [song, setSong] = useState();

  const { apiFetch } = useAPI();
  const {
    isSongPlayed,
    pauseAudio,
    playAudio,
    setCurrentSong,
    setCurrentSongList,
  } = useAudio();
  async function fetchSong() {
    const response = await apiFetch("/tracks/lastTrack");
    const text = await response.text();

  if (text) {
    const data = JSON.parse(text);
    setSong(data);
  
  } else {
  }

    // console.log("New song fetched:", data);
  }
  useState(() => {
    fetchSong();
  });
  return (
    <div className={styles["new-song-div"]}>

      <div className={styles["ns-text1"]}>New</div>
      <div className={styles["ns-middle"]}>
      <img className={styles["preview-image"]} src={song?.imageUrl} style={{borderStartEndRadius:'5px', borderStartStartRadius:'5px'}}/>

      </div>
      <div className={styles["ns-bottom"]}>
        
        <div className={styles["ns-song-author"]}>
          <div className={styles["ns-song"]}>{song?.title}</div>
          <div className={styles["ns-author"]}>
            {song?.artist.user.username}
          </div>
        </div>
        <div className={styles["ns-play-btn-div"]}>
          {isSongPlayed ? (
            <button
              className={styles["ns-play-btn1"]}
              onClick={() => {
                pauseAudio();
              }}
            ></button>
          ) : (
            <button
              className={styles["ns-play-btn"]}
              onClick={() => {
                setCurrentSong(song);
                setCurrentSongList([song]);
                //playAudio();
              }}
            ></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewSongs;
