import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import playerStyles from "../player-page/player.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";
import SongItem from "../player-page/SongItem";

const WatchAlbum = ({ isOpen, onClose, children, album }) => {
  const { apiFetch } = useAPI();
  const { setIsRandomList, setCurrentSongList,setCurrentSong } = useAudio();
  const [albumSongs, setAlbumSongs] = useState([]);
  useEffect(() => {
    if (!album) return;
    fetchAlbumTracks();
  }, [album]);

  const fetchAlbumTracks = async () => {
    const response = await apiFetch(`/albums/albums-tracks/${album?.id}`);
    const data = await response.json();
    setAlbumSongs(data);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={styles["wam-overlay"]} onClick={onClose} />
      <div className={styles["wam-modal"]}>
        <div className={playerStyles["foot-left"]}>
          <img className={playerStyles["foot-photo"]} src={album.imageUrl} />
          <div className={playerStyles["foot-bcontent"]}>
            <div className={styles["wam-svyazka"]}>
              <div className={styles["wam-songartist"]}>
                <div className={playerStyles["foot-song"]}>
                  {""}
                  {album.title}
                </div>
                <div className={playerStyles["foot-artist"]}>
                  {album.artist.user.username}
                </div>
              </div>
              <div className={styles["wam-btnplace"]}>
                <button
                  className={styles["wam-play"]}
                  onClick={() => {
                    if (albumSongs.length > 0) {
                      setIsRandomList(false);
                      setCurrentSong(albumSongs[0]);
                      setCurrentSongList(albumSongs);
                    }
                  }}
                ></button>
              </div>
            </div>

            <div className={playerStyles["foot-likeslisteners"]}>
              {/* <div className={playerStyles["foot-likes"]}>
                {""} 52 listenings
              </div> */}
            </div>
          </div>
        </div>

        <div className={playerStyles["foot-right"]}>
          <div className={playerStyles["tab-content"]}>
            <button className={playerStyles["up-next-btn"]}>Up next</button>
          </div>

          <div className={playerStyles["foot-array"]}>
            {albumSongs.map((i) => (
              <SongItem
                key={i.id}
                song={i}
                onSetCurrentSongList={() => {
                  setIsRandomList(false);
                  setCurrentSongList(albumSongs);
                }}
                moreInfo
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchAlbum;
