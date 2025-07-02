import React, { useEffect, useState } from "react";
import styles from "./player.module.css";
import {
  convertTime,
  isUserPlaylistContainsSong,
} from "../../js/functions/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";

const SongItem = ({
  onSongSelect,
  song,
  moreInfo,
  onSetCurrentSongList,
  isPlaylistsChangesControl,
}) => {
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const audio = new Audio();
    audio.src = song.sourceUrl;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(audio.duration));
    });
  }, [song]);

  useEffect(() => {
    const checkLiked = async () => {
      if (isAuthenticated && user) {
        const liked = await isUserPlaylistContainsSong(
          song,
          user,
          getAccessTokenSilently
        );
        setIsLiked(liked);
      }
    };
    checkLiked();
  }, [song, user, isAuthenticated, getAccessTokenSilently]);

  // Закриваємо меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Якщо клік не всередині меню і не на кнопку меню
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
    if (isAuthenticated && user) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const responsePlaylist = await fetch(
        `http://localhost:8080/playlists/playlists/${user.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await responsePlaylist.json();
      var playlist = body.find((i) => i.title === "Like");

      const response = await fetch(
        `http://localhost:8080/playlists/${playlist.id}/tracks/${song.id}`,
        {
          method: isLiked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setIsLiked(!isLiked);
        isPlaylistsChangesControl.setIsPlaylistsChanges(true);
      } else {
        console.error("Failed to like/unlike the song");
      }
    }
  };

  return (
    <button
      className={styles["song-item"]}
      onClick={() => {
        onSongSelect(song);
        onSetCurrentSongList();
        setIsMenuOpen(false); // закриваємо меню при виборі пісні
      }}
    >
      <div className={styles.cover}></div>
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
            >
              +
            </div>
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
                <div className={styles["dropdown-itemup"]}>Add to playlist</div>
                <div className={styles["dropdown-item"]}>Go to artist</div>
                <div className={styles["dropdown-item"]}>Copy Song Link</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.duration}>{convertTime(duration)}</div>
      )}
    </button>
  );
};

export default SongItem;
