import React, { use, useEffect, useState } from "react";
import stylesFooter from "../player-page/player.module.css";
import stylesLeft from "../main-page/main.module.css";

import AudioControl from "./AudioControl";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAudio } from "../../hooks/useAudio";

const Modal = ({ onClose, song }) => {
  return (
    <div className={stylesFooter.modalBackdrop} onClick={onClose}>
      <div
        className={stylesFooter.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={stylesFooter["foot-left"]}>
          <div className={stylesFooter["foot-photo"]}></div>

          <div className={stylesFooter["foot-bcontent"]}>
            <div className={stylesFooter["foot-songartist"]}>
              <div className={stylesFooter["foot-song"]}>Song tittle</div>
              <div className={stylesFooter["foot-artist"]}>Song artist</div>
            </div>
            <div className={stylesFooter["foot-likeslisteners"]}>
              <div className={stylesFooter["foot-likes"]}>520204 likes</div>
              <div className={stylesFooter["foot-listeners"]}>
                14784235 listeners
              </div>
            </div>
          </div>
        </div>

        <div className={stylesFooter["foot-right"]}>
          <div className={stylesFooter["tab-content"]}>
            <button className={stylesFooter["up-next-btn"]}>Up next</button>
          </div>

          <div className={stylesFooter["foot-array"]}>
            {[...Array(16)].map((_, i) => (
              <div key={i} className={stylesFooter["songfsdfs"]}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MusicPlayer = ({ footerPlayer, isHovered }) => {
  const { apiFetch}=useAPI()
  const { currentSong, setCurrentSong, setCurrentSongList } =
    useAudio();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth0();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /*  const fetchPlaylist = async () => {
    const response = await apiFetch(`/playlists/playlists/${user?.sub}/Like`);
    const data = await response.json();
    console.log("Playlist fetched:", data);
    return data;
  };
  const fetchSong = async () => {
    if (isLoading) return;
    console.log(isLoading);
    const playlist = await fetchPlaylist();
    const response = await apiFetch(`/tracks/tracks/${playlist.id}`);
    const data = await response.json();
    console.log("Songs fetched:", data);
    setCurrentSongList(data);
    setCurrentSong(data[0]);
  };
  useEffect(() => {
    fetchSong();
  }, [isLoading]); */
  return (
    <>
      {footerPlayer ? (
        <div className={stylesFooter["footer-container"]}>
          <div className={stylesFooter["mr-bottom"]}>
            <div className={stylesFooter["mrb-left"]} onClick={handleOpenModal}>
              <div className={stylesFooter["bmr-cover"]}></div>
              <div className={stylesFooter["bmr-song-info"]}>
                <div className={stylesFooter["bmr-title"]}>
                  {currentSong?.title}
                </div>
                <div className={stylesFooter["bmr-artist"]}>
                  {currentSong?.artist?.user?.username}
                </div>
              </div>
            </div>

            <AudioControl footerPlayer />
          </div>

          {isModalOpen && (
            <Modal onClose={handleCloseModal} song={currentSong} />
          )}
        </div>
      ) : (
        <div className={stylesLeft["song-place-div"]}>
          <div className={stylesLeft["song-name"]}>{currentSong?.title}</div>
          <div className={stylesLeft.singer}>
            {currentSong?.artist?.user?.username}
          </div>
          <AudioControl isHovered={isHovered}/>


          {/* <div className={stylesLeft["circle-song"]}></div> */}
          {/* <AudioControl /> */}
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
