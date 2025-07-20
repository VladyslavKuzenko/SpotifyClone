import React, { useState, useEffect, useRef } from "react";
import styles from "./player.module.css";
import SongItem from "./SongItem";
import { searchSongs } from "../../js/functions/functions";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../js/properties/properties";
import { useAPI } from "../../hooks/useApi";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../hooks/useAudio";
import Likes from "../likes-page/Likes";

const options = [
  { value: "recent", label: "Recent" },
  { value: "az", label: "A-Z" },
  // { value: "artist", label: "By Artist" },
];

const YourLibrary = ({ isPlaylistsChangesControl,isLikesPageControl }) => {
  // State
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [titlePlaylist, setTitlePlaylist] = useState("");
  const [sortType, setSortType] = useState("recent");
  const { apiFetch } = useAPI();
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Hooks
  const { setCurrentSongList } = useAudio();
  const { isLoading, isAuthenticated } = useAuth0();
  const { user } = useAPI();
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
    if (isPlaylistsChangesControl.isPlaylistsChanges || !isLoading) {
      fetchPlaylists();
      isPlaylistsChangesControl.setIsPlaylistsChanges(false);
    }
    // eslint-disable-next-line
  }, [isLoading, isPlaylistsChangesControl.isPlaylistsChanges]);

  useEffect(() => {
    if (songs.length > 0) {
      handleSortSongs("recent");
      setSortType("recent");
    }
    // eslint-disable-next-line
  }, [songsFullList]);

  // Handlers
  const handleCreatePlaylist = async () => {
    const response = await apiFetch("/playlists", {
      method: "POST",
      headers: {
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
  };

  const fetchPlaylists = async () => {
    const response = await apiFetch(`/playlists/playlists/${user.sub}`);
    const body = await response.json();
    setPlaylists(body);
    handleGetCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  };

  const handleGetCurrentPlaylistTracks = async (currentPlaylist) => {
    const response = await apiFetch(
      `/tracks/tracks-by-postTime/${currentPlaylist.id}`
    );
    const body = await response.json();
    setSongs(body);
    setSongsFullList(body);
  };

  const handleSortSongs = (type) => {
    let sorted = [...songs];
    if (type === "recent") {
      sorted.sort((a, b) => b.id - a.id);
    } else if (type === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSongs(sorted);
  };

  // Render
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
      <div className={styles["your-library"]}>
        <div className={styles["yl-empty1"]}></div>
        <div className={styles["yl-main"]}>
          {/* Header */}
          <div className={styles["yl-text-plus"]}>
            <div className={styles["yl-text"]}>Your library</div>
            <div
              className={styles["yl-plus-plat"]}
              onClick={() => setIsModalOpen(true)}
            >
              <div className={styles["yl-plus"]}>+</div>
            </div>
            <div className={styles["go-likes"]}>
              <button
                className={styles["golikes-btn"]}
                // onClick={() => navigate("/likes")}
                onClick={() => isLikesPageControl.setIsLikesPage(!isLikesPageControl.isLikesPage)}
              ></button>
            </div>
          </div>

          {/* Playlists */}
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

          {/* Search and Sort */}
          <div className={styles["search-recent"]}>
            <div className={styles["sr-search"]}>
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchSongs(songsFullList, e.target.value, setSongs);
                }}
                value={search}
                className={styles["search-css"]}
                placeholder="Search"
              />
            </div>
            <div className={styles["sr-recent"]}>
              <Select
                classNamePrefix="sr-select"
                value={options.find((opt) => opt.value === sortType)}
                onChange={(e) => {
                  setSortType(e.value);
                  handleSortSongs(e.value);
                }}
                options={options}
                isSearchable={false}
                placeholder="Select sort type"
              />
            </div>
          </div>

          {/* Songs */}
          <div className={styles["yl-song-container"]}>
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

      {/* Modal */}
      {isModalOpen && (
        <div
          className={styles["modal-overlay"]}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles["modal-window"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-right-side"]}>
              <div className={styles["empty-modal1"]}>New playlist</div>
              <div className={styles["name-desc"]}>
                <input
                  type="text"
                  className={styles["playlist-name"]}
                  id="inp-title"
                  placeholder="Title"
                  value={titlePlaylist}
                  onChange={(e) => setTitlePlaylist(e.target.value)}
                />
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
        </div>
      )}
    </>
  );
};
export default YourLibrary;
