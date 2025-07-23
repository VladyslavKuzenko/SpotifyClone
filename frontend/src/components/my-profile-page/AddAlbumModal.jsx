import React, { useState, useEffect, useRef } from "react";
import styles from "./MyProfile.module.css";
import mainPageStyles from "../main-page/main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { submitAlbum } from "../../js/functions/functions";

const AddAlbumModal = ({ onClose }) => {
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Select genre");
  const genreRef = useRef(null);
  const [albumImage, setAlbumImage] = useState(null);
  const [songTitles, setSongTitles] = useState("");
  const [songList, setSongList] = useState([]);
  const [albumTitle, setAlbumTitle] = useState([]);
  //   const [songs, setSongs] = useState([{ id: Date.now() }]);
  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);
  const { apiFetch, apiAxiosPost, user } = useAPI();

  const genres = ["Hip hop", "Pop", "Rock", "Jazz", "Electronic", "Reggae"];

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setShowGenreMenu(false);
  };

  //   const addSong = () => {
  //     setSongs((prev) => [...prev, { id: Date.now() }]);
  //   };

  const removeSong = (currentSong) => {
    setSongList((prev) => prev.filter((song) => song !== currentSong));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setShowGenreMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["amm-overlay"]}>
      <div className={styles["abm-modal"]}>
        <div className={styles["amm-left"]}>
          <h3 className={styles["h3"]}>Add album</h3>
          <div className={styles["amm-photo"]}>
            {albumImage && (
              <img
                className={mainPageStyles["preview-image"]}
                src={URL.createObjectURL(albumImage)}
              // alt="preview"
              />
            )}
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            ref={imageInputRef}
            onChange={(e) => setAlbumImage(e.target.files[0])}
            accept="image/*"
          />

          <button
            className={styles["cover-btn"]}
            onClick={() => imageInputRef.current.click()}
          >
            + Cover
          </button>
        </div>

        <div className={styles["amm-right"]}>
          <input
            type="text"
            className={styles["amm-name"]}
            placeholder="Name of album"
            value={albumTitle}
            onChange={(e) => {
              setAlbumTitle(e.target.value);
            }}
          />

          <div className={styles["amm-genre-container"]} ref={genreRef}>
            <div
              className={styles["amm-genre-selected"]}
              onClick={() => setShowGenreMenu((prev) => !prev)}
            >
              <span>{selectedGenre}</span>
              <span className={styles["amm-arrow"]}>
                {showGenreMenu ? "▲" : "▼"}
              </span>
            </div>

            {showGenreMenu && (
              <div className={styles["amm-genre-menu"]}>
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className={styles["amm-genre-item"]}
                    onClick={() => handleSelectGenre(genre)}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles["songs-array"]}>
            {songList.map((song, index) => (
              <div key={song.id || song.name} className={styles["flex-position"]}>
                <div className={styles["add-photo"]}></div>

                <div className={styles["songs-svyazka"]}>
                  <input
                    type="text"
                    className={styles["songname"]}
                    placeholder={`Name of song #${index + 1}`}
                    value={songTitles[index]}
                    onChange={(e) => {
                      const updatedItems = [...songTitles];
                      updatedItems[index] = e.target.value;
                      setSongTitles(updatedItems);
                    }}
                  />

                  <div className={styles["music-delete"]}>
                    <button className={styles["music-file"]}>
                      {song.name || "Music file"}
                    </button>
                    <button
                      className={styles["delete-song-btn"]}
                      onClick={() => removeSong(song)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <input
              style={{ display: "none" }}
              type="file"
              ref={songInputRef}
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                if (songList.length + newFiles.length > 10) return;
                setSongList([...songList, ...newFiles]);
              }}
              accept="audio/*"
              multiple
            />

            <button
              className={styles["add-song-btn"]}
              onClick={() => songInputRef.current.click()}
            >
              +
            </button>
          </div>


          <div className={styles["cancel-create"]}>
            <button className={styles["cancel"]} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles["create"]}
              onClick={() =>
                submitAlbum(
                  albumTitle,
                  songTitles,
                  songList,
                  albumImage,
                  selectedGenre,
                  user?.sub,
                  apiFetch,
                  apiAxiosPost
                )
              }
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAlbumModal;
