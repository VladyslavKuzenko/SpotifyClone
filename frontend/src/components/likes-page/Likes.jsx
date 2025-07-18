import React, { useEffect, useRef, useState } from "react";
import LeftSide from "../main-components/LeftSide";
import { useNavigate } from "react-router-dom";
import palyerStyles from "../player-page/player.module.css";
import styles from "./likes.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAudio } from "../../hooks/useAudio";
import { API_URL } from "../../js/properties/properties";
import SongItem from "../player-page/SongItem";

export default function Likes({ isPlaylistsChangesControl }) {
  const navigate = useNavigate();
  // State
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("");
  const [sortType, setSortType] = useState("recent");
  const dropdownRef = useRef();

  // Hooks
  const { setCurrentSong, setCurrentSongList } = useAudio();

  const { getAccessTokenSilently, user } = useAuth0();
  const { isLoading, isAuthenticated } = useAuth0();

  // Effects
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // setShowOptions(false); // Якщо потрібно для кастомного дропдауна
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchPlaylists();
    }
  }, [isLoading]);

  useEffect(() => {
    if (songs.length > 0) {
      //   handleSortSongs("recent");
      setSortType("recent");
    }
    // eslint-disable-next-line
  }, [songsFullList]);

  // Handlers
  const handleCreatePlaylist = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
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
        authorizationParams: { audience: API_URL },
      });
      const response = await fetch(
        `http://localhost:8080/playlists/playlists/${user.sub}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const body = await response.json();
      setPlaylists(body);
      handleGetCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
    }
  };

  const handleGetCurrentPlaylistTracks = async (currentPlaylist) => {
    if (isAuthenticated && currentPlaylist) {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: API_URL },
      });
      const response = await fetch(
        `http://localhost:8080/tracks/tracks-by-postTime/${currentPlaylist.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const body = await response.json();
      setSongs(body);
      setSongsFullList(body);
    }
  };
  return (
    <div>
      <div className={styles["likes-container"]}>
        <div className={styles["empty1"]}></div>

        <div className={styles["likes-platform"]}>
          <div className={styles["likes-content"]}>
            <div className={styles["upper"]}>
              <div className={styles["back-search"]}>
                <button
                  className={styles["backbtn"]}
                  onClick={() => navigate("/player")}
                ></button>
                <input
                  type="text"
                  className={styles["search-likes"]}
                  placeholder="Search"
                />
              </div>

              <div className={palyerStyles["playlist-platform"]}>
                {/* <div className={styles["likes-playlists"]}> */}
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
            </div>

            <div className={styles["middle"]}>
              <div className={styles["likes-photo"]}> </div>
              <div className={styles["likes-play"]}>
                <div className={styles["likes-text"]}>Likes</div>
                <button
                  className={styles["play-btn"]}
                  onClick={() => {
                    if (songs.length > 0) {
                      setCurrentSong(songs[0]);
                      setCurrentSongList(songs);
                    }
                  }}
                >
                  Play
                </button>
              </div>
            </div>

            <div className={styles["bottom"]}>
              <div className={styles["bottom-wrapper"]}>
                {songs.map((i) => (
                  <SongItem
                    key={i.id}
                    song={i}
                    onSetCurrentSongList={() => setCurrentSongList(songs)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
