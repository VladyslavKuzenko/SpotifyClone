import { useEffect, useState } from "react";
import SongItem from "./SongItem";

import styles from "./player.module.css";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { isSubscribed, searchSongs } from "../../js/functions/functions";

export default function MiddleItem({
  onSongSelect,
  onSetCurrentSongList,
  isPlaylistsChangesControl,
}) {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [artists, setArtists] = useState();
  const [currentArtist, setCurrentArtist] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  // Стан для ID пісні з відкритим меню
  const [openMenuSongId, setOpenMenuSongId] = useState(null);

  const handleArtistMusic = async () => {
    if (isAuthenticated && currentArtist) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const response = await fetch(
        `http://localhost:8080/tracks/tracks-by-artists/${currentArtist?.user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const body = await response.json();
      setSongs(body);
      setSongsFullList(body);
    }
  };

  const handleStart = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const responseArtist = await fetch("http://localhost:8080/artists/top/0/20", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bodyArtists = await responseArtist.json();
      setArtists(bodyArtists);
      setCurrentArtist(bodyArtists[0]);
    }
  };

  const habdleFollow = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const response = await fetch(
        `http://localhost:8080/users/follow/${user.sub}/${currentArtist?.user.id}`,
        {
          method: isFollowed ? "DELETE" : "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        setIsFollowed(!isFollowed);
      } else {
        console.error("Failed to follow/unfollow the artist");
      }
    }
  };

  useEffect(() => {
    handleStart();
  }, [isLoading]);

  useEffect(() => {
    handleArtistMusic();
    const checkFollowed = async () => {
      if (isAuthenticated && user && currentArtist) {
        const subscribed = await isSubscribed(user, currentArtist?.user, getAccessTokenSilently);
        setIsFollowed(subscribed);
      }
    };
    checkFollowed();
  }, [currentArtist]);

  const nextArtist = () => {
    if (artists && artists.indexOf(currentArtist) + 1 < artists.length) {
      setCurrentArtist(artists[artists.indexOf(currentArtist) + 1]);
    }
  };
  const prevArtist = () => {
    if (artists && artists.indexOf(currentArtist) - 1 >= 0) {
      setCurrentArtist(artists[artists.indexOf(currentArtist) - 1]);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className={styles["mr-midd"]}>
      {/* Верхня частина UI */}
      <div className={styles["artist-songs"]}>
        <div className={styles["as-plat1"]}>
          <div className={styles["as-search-plat"]}>
            <input
              className={styles["as-search"]}
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
                searchSongs(songsFullList, e.target.value, setSongs);
              }}
              value={search}
              placeholder="Search"
            />
          </div>
          <div className={styles["recommended-artist"]}>
            <div className={styles["recommended-text1"]}>Recommended for you</div>
            <div className={styles["artist-text"]}>Artist</div>
          </div>
        </div>

        {/* Плеєр і кнопки перемикання артистів */}
        <div className={styles["as-plat2"]}>
          <div className={styles["empty-div1"]}></div>
          <div className={styles["artist-listeners"]}>
            <div className={styles["left-right-btns"]}>
              <button className={styles["left-btn-plat"]} onClick={prevArtist}>
                {"<"}
              </button>
              <button className={styles["right-btn-plat"]} onClick={nextArtist}>
                {">"}
              </button>
            </div>
            <div className={styles["al-artist"]}>
              {currentArtist?.user.firstName} {currentArtist?.user.lastName}
            </div>
            <div className={styles["al-listeners"]}>
              {currentArtist?.listeningCount} monthly listeners
            </div>
          </div>
          <div className={styles["play-follow"]}>
            <div className={styles["pf-empty1"]}></div>
            <div className={styles["pf-container"]}>
              <button
                className={styles["pf-play"]}
                onClick={() => {
                  onSongSelect(songs[0]);
                  onSetCurrentSongList(songs);
                }}
              >
                Play
              </button>
              <button className={styles["pf-follow"]} onClick={habdleFollow}>
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
        </div>

        {/* Тексти заголовків */}
        <div className={styles["recommended-text"]}>
          <div className={styles["rec-songs"]}>Songs</div>
          <div className={styles["rec-album"]}>Albums</div>
        </div>

        {/* Список пісень */}
        <div className={styles["as-plat3"]}>
          <div className={styles["plat3-array"]}>
            {songs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                moreInfo
                onSongSelect={onSongSelect}
                onSetCurrentSongList={() => onSetCurrentSongList(songs)}
                isPlaylistsChangesControl={isPlaylistsChangesControl}
                openMenu={openMenuSongId === song.id}
                toggleMenu={() =>
                  setOpenMenuSongId(openMenuSongId === song.id ? null : song.id)
                }
                closeMenu={() => setOpenMenuSongId(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
