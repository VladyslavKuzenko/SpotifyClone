import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import palyerStyles from "../player-page/player.module.css";
import styles from "./likes.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAudio } from "../../hooks/useAudio";
import SongItem from "../player-page/SongItem";
import { useAPI } from "../../hooks/useApi";

export default function Likes({ exit }) {
  const navigate = useNavigate();
  // State
  // const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState();
  // const [titlePlaylist, setTitlePlaylist] = useState("");
  const [sortType, setSortType] = useState("recent");
  const dropdownRef = useRef();
  // Hooks
  const { apiFetch, user } = useAPI();
  const { setCurrentSong, setCurrentSongList } = useAudio();
  const { isLoading } = useAuth0();

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
    console.log("Likes Use Effect. User: ", user);
    console.log("Likes Use Effect. IsLoading: ", isLoading);
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
  const fetchPlaylists = async () => {
    const response = await apiFetch(`/playlists/playlists/${user.sub}`);
    const body = await response.json();
    setPlaylists(body);
    setCurrentPlaylist(body[0]);
    handleGetCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  };

  const handleGetCurrentPlaylistTracks = async (currentPlaylist) => {
    const response = await apiFetch(
      `/tracks/tracks-by-postTime/${currentPlaylist.id}`
    );
    const body = await response.json();
    setSongs(body);
    setSongsFullList(body);
    setCurrentPlaylist(currentPlaylist);
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
                  // onClick={() => navigate("/player")}
                  onClick={() => exit()}
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
              <img
                className={styles["likes-photo"]}
                src={songsFullList[0]?.imageUrl}
                alt=""
              />
              {/* <div className={styles["likes-photo"]}> </div> */}
              <div className={styles["likes-play"]}>
                <div className={styles["likes-text"]}>
                  {currentPlaylist?.title}
                </div>
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
                    moreInfo
                    currentPlaylist={currentPlaylist}
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
