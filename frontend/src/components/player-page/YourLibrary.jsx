import React, { use, useEffect, useState } from "react";
import styles from "./player.module.css";
import SongItem from "./SongItem";
import { searchSongs } from "../../js/functions/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../js/properties/properties";

const YourLibrary = ({
  onSongSelect,
  onSetCurrentSongList,
  isPlaylistsChangesControl,
}) => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("");

  const { getAccessTokenSilently, getAccessTokenWithPopup, user } = useAuth0();
  const { isLoading, isAuthenticated } = useAuth0();

  const handleCreatePlaylist = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch(`http://localhost:8080/playlists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: titlePlaylist, user: { id: user.sub } }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setTitlePlaylist("");
        isPlaylistsChangesControl.setIsPlaylistsChanges(true);
      } else {
        console.error("Failed to create playlist");
      }
    }
  };

  const fetchPlaylists = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch(
        `http://localhost:8080/playlists/playlists/${user.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json();
      setPlaylists(body);
      /*      console.log("Playlists: ");
      console.log(body); */
      handleGetCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
    }
  };
  useEffect(() => {
    if (isPlaylistsChangesControl.isPlaylistsChanges || !isLoading) {
      async function fetchData() {
        fetchPlaylists();
      }
      fetchData();
      isPlaylistsChangesControl.setIsPlaylistsChanges(false);
    }
  }, [isLoading, isPlaylistsChangesControl.isPlaylistsChanges]);
  const handleGetCurrentPlaylistTracks = async (currentPlaylist) => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch(
        `http://localhost:8080/tracks/tracks/${currentPlaylist.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json();
      setSongs(body);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <div className={styles["your-library"]}>
        <div className={styles["yl-empty1"]}></div>

        <div className={styles["yl-main"]}>
          <div className={styles["yl-text-plus"]}>
            <div className={styles["yl-text"]}>Your library</div>
            <div
              className={styles["yl-plus-plat"]}
              onClick={() => setIsModalOpen(true)}
            >
              <div className={styles["yl-plus"]}>+</div>
            </div>
          </div>

          <div className={styles["playlist-platform"]}>
            {playlists.map((i) => (
              <button
                key={i.id}
                className={styles["playlist-element"]}
                onClick={() => handleGetCurrentPlaylistTracks(i)}
              >
                {i.title}
              </button>
            ))}
          </div>

          <div className={styles["search-recent"]}>
            <div className={styles["sr-search"]}>
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchSongs(songsFullList, e.target.value, setSongs);
                }}
                value={search}
              />
            </div>
            <div className={styles["sr-recent"]}>Recent</div>
          </div>

          <div className={styles["yl-song-container"]}>
            {songs.map((i) => (
              <SongItem
                key={i.id}
                onSongSelect={onSongSelect}
                song={i}
                onSetCurrentSongList={() => {
                  onSetCurrentSongList(songs);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles["modal-window"]}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <div className={styles["modal-left-side"]}>
              <div className={styles["modal-text"]}> New playlist</div>
              <div className={styles["modal-image"]}>
                <div className={styles["playlist-img"]}></div>
                <button className={styles["playlist-btn"]}>
                  Select image{" "}
                </button>
              </div>
            </div> */}

            <div className={styles["modal-right-side"]}>
              <div className={styles["empty-modal1"]}></div>
              <div className={styles["name-desc"]}>
                <input
                  type="text"
                  className={styles["playlist-name"]}
                  name=""
                  id="inp-title"
                  placeholder="Title"
                  value={titlePlaylist}
                  onChange={(e) => setTitlePlaylist(e.target.value)}
                />
                <input
                  type="text"
                  className={styles["playlist-description"]}
                  name=""
                  id=""
                  placeholder="Description"
                />
              </div>

              {/*  <div className={styles["access"]}>
                <div className={styles["access-text"]}>Playlist access</div>
                <div className={styles["private-public"]}>
                  <label className={styles["private-label"]}>
                    <input type="checkbox" className={styles["private-box"]} />
                    <span>Private</span>
                  </label>

                  <label className={styles["public-label"]}>
                    <input type="checkbox" className={styles["public-box"]} />
                    <span>Public</span>
                  </label>
                </div>
              </div> */}

              <div className={styles["cancel-create"]}>
                <button
                  className={styles["cancel-btn"]}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles["create-btn"]}
                  onClick={handleCreatePlaylist}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourLibrary;
