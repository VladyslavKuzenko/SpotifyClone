import { useEffect, useState } from "react";
import { searchSongs } from "../../js/functions/functions";
import styles from "./player.module.css";
import SongItem from "./SongItem";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import FollowingButton from "../sharedComponents/FollowingButton";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";
import AlbumItem from "../my-profile-page/AlbumItem";

export default function MiddleItem({
  /*  
  onSetCurrentSongList, */
  isPlaylistsChangesControl,
}) {
  const { apiFetch, user } = useAPI();
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState();
  const [artists, setArtists] = useState([]);
  const [currentArtist, setCurrentArtist] = useState(null);
  const { isAuthenticated, isLoading } = useAuth0();
  const [openMenuSongId, setOpenMenuSongId] = useState(null);
  const { setCurrentSong, setCurrentSongList } = useAudio();
  // Вкладка для артиста: 'songs' або 'albums'
  const [activeArtistTab, setActiveArtistTab] = useState("songs");

  // Вкладка зовнішня: "artist" або "recommended"
  const [activeTab, setActiveTab] = useState("artist");

  const handleArtistSongs = async () => {
    const response = await apiFetch(
      `/tracks/tracks-by-artists/${currentArtist?.user.id}`
    );
    const body = await response.json();
    setSongs(body);
    setSongsFullList(body);
  };
  const handleRecomendedSongs = async () => {
    const response = await apiFetch(`/tracks/tracks-without-like/${user?.sub}`);
    const body = await response.json();
    setSongs(body);
    setSongsFullList(body);
  };

  const fetchAlbum = async () => {
    if (!currentArtist) return;

    const response = await apiFetch(
      `/albums/albums-by-artists/${currentArtist.id}`
    );
    const data = await response.json();
    setAlbums(data);
    setCurrentAlbum(data[0]);
  };
  const fetchAlbumTracks = async () => {
    if (!currentAlbum) return;
    const response = await apiFetch(
      `/albums/albums-tracks/${currentAlbum?.id}`
    );
    const data = await response.json();
    setSongs(data);
    setSongsFullList(data);
  };

  const handleStart = async () => {
    const responseArtist = await apiFetch("/artists/top/0/20");
    const bodyArtists = await responseArtist.json();
    setArtists(bodyArtists);
    setCurrentArtist(bodyArtists[0]);
  };

  useEffect(() => {
    if (isLoading) return;

    const fetchData = async () => {
      await handleStart();
    };

    fetchData();
    fetchAlbum();
  }, [isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      await handleArtistSongs();
    };

    fetchData();
    fetchAlbum();
  }, [currentArtist]);

  useEffect(() => {
    fetchAlbumTracks();
  }, [currentAlbum]);

  useEffect(() => {
    if (activeTab === "recommended") {
      handleRecomendedSongs();
    } else {
      handleArtistSongs();
    }
  }, [activeTab]);

  const nextArtist = () => {
    if (artists && artists.indexOf(currentArtist) + 1 < artists.length) {
      setCurrentArtist(artists[artists.indexOf(currentArtist) + 1]);
      setActiveArtistTab("songs");
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
                  ></button>
                  <button
                    className={styles["right-btn-plat"]}
                    onClick={nextArtist}
                  ></button>
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
                  {albums.map((item, index) => (
                    <AlbumItem
                      album={item}
                      key={index}
                      onClickFunck={() => {
                        setCurrentAlbum(item);
                      }}
                    />
                  ))}
                </div>

                <div className={styles["albums-array-songs"]}>
                  {/* {[...Array(14)].map((_, i) => ( */}
                  <>
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
                      <div>{/*No songs found*/}</div>
                    )}
                  </>
                  {/* ))} */}
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
