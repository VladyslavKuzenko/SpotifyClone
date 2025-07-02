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
  const [albums, setAlbums] = useState([]); // стан для альбомів
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [openMenuSongId, setOpenMenuSongId] = useState(null);

  // Вкладка для артиста: 'songs' або 'albums'
  const [activeArtistTab, setActiveArtistTab] = useState("songs");

  // Вкладка зовнішня: "artist" або "recommended"
  const [activeTab, setActiveTab] = useState("artist");

  const handleArtistSongs = async () => {
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

  const handleArtistAlbums = async () => {
    if (isAuthenticated && currentArtist) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const responseAlbums = await fetch(
        `http://localhost:8080/albums/by-artist/${currentArtist?.user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const bodyAlbums = await responseAlbums.json();

      // Якщо сервер повертає об'єкт із масивом альбомів в іншій властивості, наприклад bodyAlbums.albums - поправте тут
      // setAlbums(bodyAlbums.albums || []);
      setAlbums(Array.isArray(bodyAlbums) ? bodyAlbums : []);
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

  // Коли змінюється currentArtist або активна вкладка зовнішня - завантажуємо пісні та перевіряємо підписку
  useEffect(() => {
    if (activeTab === "artist" && currentArtist) {
      if (activeArtistTab === "songs") {
        handleArtistSongs();
      } else if (activeArtistTab === "albums") {
        handleArtistAlbums();
      }

      const checkFollowed = async () => {
        if (isAuthenticated && user && currentArtist) {
          const subscribed = await isSubscribed(user, currentArtist?.user, getAccessTokenSilently);
          setIsFollowed(subscribed);
        }
      };
      checkFollowed();
    }
  }, [currentArtist, activeTab, activeArtistTab]);

  const nextArtist = () => {
    if (artists && artists.indexOf(currentArtist) + 1 < artists.length) {
      setCurrentArtist(artists[artists.indexOf(currentArtist) + 1]);
      setActiveArtistTab("songs"); // сброс вкладки при зміні артиста
    }
  };
  const prevArtist = () => {
    if (artists && artists.indexOf(currentArtist) - 1 >= 0) {
      setCurrentArtist(artists[artists.indexOf(currentArtist) - 1]);
      setActiveArtistTab("songs");
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
                if (activeTab === "artist" && activeArtistTab === "songs") {
                  searchSongs(songsFullList, e.target.value, setSongs);
                }
                // Можна додати пошук для Recommended, якщо треба
              }}
              value={search}
              placeholder="Search"
            />
          </div>
          <div className={styles["recommended-artist"]}>
            <div
              className={`${styles["recommended-text1"]} ${activeTab === "recommended" ? styles.activeTab : ""
                }`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended for you
            </div>
            <div
              className={`${styles["artist-text"]} ${activeTab === "artist" ? styles.activeTab : ""
                }`}
              onClick={() => setActiveTab("artist")}
            >
              Artist
            </div>
          </div>
        </div>

        {/* Вміст вкладок */}
        {activeTab === "artist" && (
          <>
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
                      if (songs.length > 0) {
                        onSongSelect(songs[0]);
                        onSetCurrentSongList(songs);
                      }
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

            {/* Вкладки Songs / Albums */}
            <div className={styles["recommended-text"]}>
              <div
                className={`${styles["rec-songs"]} ${activeArtistTab === "songs" ? styles.activeTab : ""
                  }`}
                onClick={() => setActiveArtistTab("songs")}
              >
                Songs
              </div>
              <div
                className={`${styles["rec-album"]} ${activeArtistTab === "albums" ? styles.activeTab : ""
                  }`}
                onClick={() => setActiveArtistTab("albums")}
              >
                Albums
              </div>
            </div>

            {/* Контент вкладок */}
            {activeArtistTab === "songs" && (
              <div className={styles["as-plat3"]}>
                <div className={styles["plat3-array"]}>
                  {songs.length > 0 ? (
                    songs.map((song) => (
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
                    ))
                  ) : (
                    <div>No songs found</div>
                  )}
                </div>
              </div>
            )}

            {activeArtistTab === "albums" && (
              <div className={styles["albums-container"]}>

                <div className={styles["albums-array"]}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles["albums-item"]}>
                      <div className={styles["albums-nameartist"]}>
                        <div className={styles["albumsname"]}>Album name</div>
                        <div className={styles["albumsartist"]}>Album artist</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles["albums-array-songs"]}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles["albums-songs"]}>
                     
                    </div>
                  ))}
                </div>



              </div>

            )}
          </>
        )}

        {activeTab === "recommended" && (
          <div className={styles["recommended-content"]}>
            <div className={styles["recommended-array"]}>
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
        )}
      </div>
    </div >
  );
}
