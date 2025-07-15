import { use, useEffect, useState } from "react";
import { isSubscribed, searchSongs } from "../../js/functions/functions";
import styles from "./player.module.css";

import SongItem from "./SongItem";

import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import FollowingButton from "../sharedComponents/FollowingButton";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";

export default function MiddleItem({
 /*  
  onSetCurrentSongList, */
  isPlaylistsChangesControl,
}) {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [albums, setAlbums] = useState([]); // стан для альбомів
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState(null);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [openMenuSongId, setOpenMenuSongId] = useState(null);
  const { setCurrentSong, setCurrentSongList } = useAudio();
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

/*   const handleArtistAlbums = async () => {
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
  }; */

  const handleStart = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const responseArtist = await fetch(
        "http://localhost:8080/artists/top/0/20",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const bodyArtists = await responseArtist.json();
      setArtists(bodyArtists);
      setCurrentArtist(bodyArtists[0]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleStart();
    };
    fetchData();
    /*  setSongs(songsList); */
    /*    console.log("MiddleItem");
    console.log(songsList);
    console.log(songs); */
  }, [isLoading]);
  useEffect(() => {
    const fetchData = async () => {
      await handleArtistSongs();
    };

    fetchData();
  }, [currentArtist]);

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
              }}
              value={search}
              placeholder="Search"
            />
          </div>
          <div className={styles["recommended-artist"]}>
            <div
              className={`${styles["recommended-text1"]} ${
                activeTab === "recommended" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended for you
            </div>
            <div
              className={`${styles["artist-text"]} ${
                activeTab === "artist" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("artist")}
            >
              Artist
            </div>
          </div>
        </div>

        {activeTab === "artist" && (
          <>
            <div className={styles["as-plat2"]}>
              <div className={styles["empty-div1"]}></div>
              <div className={styles["artist-listeners"]}>
                <div className={styles["left-right-btns"]}>
                  <button
                    className={styles["left-btn-plat"]}
                    onClick={prevArtist}
                  >
                  </button>
                  <button
                    className={styles["right-btn-plat"]}
                    onClick={nextArtist}
                  >
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
                        setCurrentSong(songs[0]);
                        setCurrentSongList(songs);
                      }
                    }}
                  >
                    Play
                  </button>

                  <FollowingButton
                    userToFollow={currentArtist?.user}
                    styles={styles["pf-follow"]}
                  />
                </div>
              </div>
            </div>

            
            <div className={styles["recommended-text"]}>
              <div
                className={`${styles["rec-songs"]} ${
                  activeArtistTab === "songs" ? styles.activeTab1 : ""
                }`}
                onClick={() => setActiveArtistTab("songs")}
              >
                {/*    Play
              </button>
              <FollowingButton userToFollow={currentArtist?.user} styles={styles["pf-follow"]}/>  */}
                Songs
              </div>
              <div
                className={`${styles["rec-album"]} ${
                  activeArtistTab === "albums" ? styles.activeTab1 : ""
                }`}
                onClick={() => setActiveArtistTab("albums")}
              >
                Albums
              </div>
            </div>

            {activeArtistTab === "songs" && (
              <div className={styles["as-plat3"]}>
                <div className={styles["plat3-array"]}>
                  {songs.length > 0 ? (
                    songs.map((song) => (
                      <SongItem
                        key={song.id}
                        song={song}
                        moreInfo
                        onSetCurrentSongList={() => setCurrentSongList(songs)}
                        isPlaylistsChangesControl={isPlaylistsChangesControl}
                        openMenu={openMenuSongId === song.id}
                        toggleMenu={() =>
                          setOpenMenuSongId(
                            openMenuSongId === song.id ? null : song.id
                          )
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
                        <div className={styles["albumsartist"]}>
                          Album artist
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles["albums-array-songs"]}>
                  {[...Array(14)].map((_, i) => (
                    <>
                      {songs.length > 0 ? (
                        songs.map((song) => (
                          <SongItem
                            key={song.id}
                            song={song}
                            moreInfo
                            onSetCurrentSongList={() =>
                              setCurrentSongList(songs)
                            }
                            isPlaylistsChangesControl={
                              isPlaylistsChangesControl
                            }
                            openMenu={openMenuSongId === song.id}
                            toggleMenu={() =>
                              setOpenMenuSongId(
                                openMenuSongId === song.id ? null : song.id
                              )
                            }
                            closeMenu={() => setOpenMenuSongId(null)}
                          />
                        ))
                      ) : (
                        <div>No songs found</div>
                      )}
                    </>
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
                  onSetCurrentSongList={() => setCurrentSongList(songs)}
                  isPlaylistsChangesControl={isPlaylistsChangesControl}
                  openMenu={openMenuSongId === song.id}
                  toggleMenu={() =>
                    setOpenMenuSongId(
                      openMenuSongId === song.id ? null : song.id
                    )
                  }
                  closeMenu={() => setOpenMenuSongId(null)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
