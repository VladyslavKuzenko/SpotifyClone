import React, { useEffect, useState, useRef } from "react";
import styles from "./player.module.css";
import {
  convertTime,
  isUserPlaylistContainsSong,
} from "../../js/functions/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";
import { useNavigate } from "react-router-dom";

const SongItem = ({
  /*  onSongSelect, */
  song,
  moreInfo,
  onSetCurrentSongList,
  isPlaylistsChangesControl,
}) => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtpModalOpen, setIsAtpModalOpen] = useState(false);
  const atpRef = useRef(null);
  const { isLoading } = useAuth0();
  const { setCurrentSong } = useAudio();
  const { apiFetch, user } = useAPI();
  const [playlists, setPlaylists] = useState([]);

  ////////////////////////////////////////КОД ДУБЛЮЄТЬСЯ , ВИДАЛИТИ ПІСЛЯ РЕАЛІЗАЦІЇ UserInfoProvider, це має бути там
  const fetchPlaylists = async () => {
    const response = await apiFetch(`/playlists/playlists/${user.sub}`);
    const body = await response.json();

    const playlists = await Promise.all(
      body.map(async (playlist) => {
        const responseIsInPlaylist = await apiFetch(
          `/playlists/is-in-playlist/${playlist.id}/${song.id}`
        );
        const isInPlaylist = await responseIsInPlaylist.json();
        return {
          ...playlist,
          isInPlaylist,
        };
      })
    );

    setPlaylists(playlists);
  };

  /////////////////////////////

  useEffect(() => {
    const audio = new Audio();
    audio.src = song.sourceUrl;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(audio.duration));
    });
  }, [song]);

  useEffect(() => {
    if (isLoading) return;
    const checkLiked = async () => {
      // if (isAuthenticated && user) {
      // console.log("checkLiked user: ", user);
      // console.log("checkLiked song: ", song);
      const liked = await isUserPlaylistContainsSong(song, user, apiFetch);
      setIsLiked(liked);
    };
    // };
    checkLiked();
    fetchPlaylists();
  }, [isLoading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Закриваємо модалку Add to playlist, якщо клік поза нею
      if (atpRef.current && !atpRef.current.contains(event.target)) {
        setIsAtpModalOpen(false);
      }
      // Закриваємо основне меню, якщо клік поза ним
      if (!event.target.closest(`.${styles["as-more-menu"]}`)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLikeClick = async () => {
    // const responsePlaylist = await apiFetch(`/playlists/playlists/${user.sub}`);
    // if (isAuthenticated && user)
    // const body = await responsePlaylist.json();
    const playlist = playlists.find((i) => i.title === "Like");
    const response = await apiFetch(
      `/playlists/${playlist.id}/tracks/${song.id}`,
      {
        method: isLiked ? "DELETE" : "POST",
      }
    );
    if (response.ok) {
      setIsLiked(!isLiked);
      isPlaylistsChangesControl?.setIsPlaylistsChanges(true);
    } else {
      console.error("Failed to like/unlike the song");
    }
  };

  const handleAddToPlaylistClick = async (playlistItem) => {
    // const responsePlaylist = await apiFetch(`/playlists/playlists/${user.sub}`);
    // const body = await responsePlaylist.json();

    const playlistOther = playlists.find((i) => i.title === playlistItem.title);
    // const responseIsInPlaylist = await apiFetch(
    //   `/playlists/is-in-playlist/${playlistOther.id}/${song.id}`
    // );
    // const isInPlaylist = await responseIsInPlaylist.json();
    console.log("playlist: ", playlistOther);
    console.log("isInPlaylist: ", playlistOther.isInPlaylist);
    const responseOther = await apiFetch(
      `/playlists/${playlistOther.id}/tracks/${song.id}`,
      {
        method: playlistOther.isInPlaylist ? "DELETE" : "POST",
      }
    );

    // if (!isInPlaylist && !isLiked) {
    //   const playlistLike = body.find((i) => i.title === "Like");
    //   const responseLike = await apiFetch(
    //     `/playlists/${playlistLike.id}/tracks/${song.id}`,
    //     {
    //       method: "POST",
    //     }
    //   );
    //   if (responseLike.ok) {
    //     setIsLiked(!isLiked);
    //     isPlaylistsChangesControl?.setIsPlaylistsChanges(true);
    //     console.log("Successfully add to playlist Like");
    //   } else {
    //     console.error("Failed to like/unlike the song");
    //   }
    // }

    if (responseOther.ok){
      playlists[playlists.indexOf(playlistOther)].isInPlaylist=!playlistOther.isInPlaylist;
      console.log("Successfully add to playlist");
    } 
    else console.error("Failed to add/delete the song from playlist");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        className={styles["song-item"]}
        onClick={() => {
          setCurrentSong(song);
          onSetCurrentSongList();
          setIsMenuOpen(false);
          setIsAtpModalOpen(false);
        }}
      >
        {/* <div className={styles.cover}></div> */}
        <img className={styles.cover} src={song.imageUrl} />
        <div className={styles.info}>
          <div className={styles.title}>{song.title}</div>
          <div className={styles.artist}>{song.artist.user.username}</div>
        </div>

        {moreInfo ? (
          <>
            <div className={styles["as-listeners-count"]}>
              {song.listeningCount}
            </div>
            <div className={styles["as-plus-plat"]}>
              <div
                className={
                  styles["as-plus"] + " " + (isLiked ? styles["liked"] : "")
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick();
                }}
                style={{
                  backgroundImage: `url(${
                    isLiked ? "/images/heartred.svg" : "/images/heart.svg"
                  })`,
                  backgroundSize: "19px 19px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
              ></div>
            </div>
            <div className={styles.duration}>{convertTime(duration)}</div>
            <div className={styles["as-more-menu"]}>
              <div
                className={styles["as-menu-plat"]}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <div className={styles["as-mp-circle"]}></div>
                <div className={styles["as-mp-circle"]}></div>
                <div className={styles["as-mp-circle"]}></div>
              </div>

              {isMenuOpen && (
                <div className={styles["dropdown-menu"]}>
                  <div
                    className={styles["dropdown-itemup-wrapper"]}
                    ref={atpRef}
                  >
                    <div
                      className={styles["dropdown-itemup1"]}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAtpModalOpen((prev) => !prev);
                      }}
                    >
                      Add to playlist
                    </div>

                    {isAtpModalOpen && (
                      <div className={styles["atp-modal"]}>
                        {playlists.map((item, index) => (
                          <div
                            key={index}
                            className={styles["atp-item"]}
                            onClick={() => handleAddToPlaylistClick(item)}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className={styles["dropdown-item"]}
                    onClick={() => {
                      navigate(`/user-profile/${song.artist.user.id}`);
                    }}
                  >
                    Go to artist
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.duration}>{convertTime(duration)}</div>
        )}
      </button>
    </>
  );
};

export default SongItem;
