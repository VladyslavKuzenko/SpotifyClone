// import React, { useState, useEffect, useRef } from "react";
// import styles from "./MyProfile.module.css";
// import mainPageStyles from "../main-page/main.module.css";
// import { useAPI } from "../../hooks/useApi";
// import { useAuth0 } from "@auth0/auth0-react";
// import { handleUploadFile, submiteMusic } from "../../js/functions/functions";

// const AddMusicModal = ({ onClose }) => {
//   const [showGenreMenu, setShowGenreMenu] = useState(false);
//   const [selectedGenre, setSelectedGenre] = useState("Select genre");
//   const [songImage, setSongImage] = useState(null);
//   const [song, setSong] = useState(null);
//   const [songTitle, setSongTitle] = useState("");
//   const genreRef = useRef(null);
//   const imageInputRef = useRef(null);
//   const songInputRef = useRef(null);
//   const { apiFetch, apiAxiosPost, user } = useAPI();

//   const genres = ["Hip hop", "Pop", "Rock", "Jazz", "Electronic", "Reggae"];

//   const handleSelectGenre = (genre) => {
//     setSelectedGenre(genre);
//     setShowGenreMenu(false);
//   };

//   useEffect(() => {
//     console.log("SONG: ", song);
//   }, [song]);
//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (genreRef.current && !genreRef.current.contains(e.target)) {
//         setShowGenreMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={styles["amm-overlay"]}>
//       <div className={styles["amm-modal"]}>
//         <div className={styles["amm-left"]}>
//           <h3 className={styles["h3"]}>Add music</h3>
//           <div className={styles["amm-photo"]}>
//             {songImage && (
//               <img
//                 className={mainPageStyles["preview-image"]}
//                 src={URL.createObjectURL(songImage)}
//                 // alt="preview"
//               />
//             )}
//           </div>

//           <input
//             style={{ display: "none" }}
//             type="file"
//             ref={imageInputRef}
//             onChange={(e) => setSongImage(e.target.files[0])}
//             accept="image/*"
//           />

//           <button
//             className={styles["cover-btn"]}
//             onClick={() => imageInputRef.current.click()}
//           >
//             + Cover
//           </button>
//         </div>

//         <div className={styles["amm-right"]}>
//           <input
//             type="text"
//             className={styles["amm-name"]}
//             placeholder="Name"
//             value={songTitle}
//             onChange={(e) => {
//               setSongTitle(e.target.value);
//               console.log(e.target.value);
//             }}
//           />

//           <div className={styles["amm-genre-container"]} ref={genreRef}>
//             <div
//               className={styles["amm-genre-selected"]}
//               onClick={() => setShowGenreMenu((prev) => !prev)}
//             >
//               <span>{selectedGenre}</span>
//               <span className={styles["amm-arrow"]}>
//                 {showGenreMenu ? "▲" : "▼"}
//               </span>
//             </div>

//             {showGenreMenu && (
//               <div className={styles["amm-genre-menu"]}>
//                 {genres.map((genre, index) => (
//                   <div
//                     key={index}
//                     className={styles["amm-genre-item"]}
//                     onClick={() => handleSelectGenre(genre)}
//                   >
//                     {genre}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <input
//             style={{ display: "none" }}
//             type="file"
//             ref={songInputRef}
//             onChange={(e) => setSong(e.target.files[0])}
//             accept="audio/*"
//           />
//           {/* <div>
//               TEEEEEST
//            {song && (
//               <audio
//                 src={URL.createObjectURL(song)}
//                 // alt="preview"
//               />
//             )}
//           </div> */}
//           <button
//             className={styles["music-file"]}
//             onClick={() => songInputRef.current.click()}
//           >
//             Music file
//           </button>
//           <div className={styles["cancel-create"]}>
//             <button className={styles["cancel"]} onClick={onClose}>
//               Cancel
//             </button>
//             <button
//               className={styles["create"]}
//               onClick={() =>
//                 submiteMusic(
//                   songTitle,
//                   song,
//                   songImage,
//                   selectedGenre,
//                   user.sub,
//                   apiFetch,
//                   apiAxiosPost
//                 )
//               }
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMusicModal;



import React, { useState, useEffect, useRef } from "react";
import styles from "./MyProfile.module.css";
import mainPageStyles from "../main-page/main.module.css";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchGenresTypes,
  handleUploadFile,
  submiteMusic,
} from "../../js/functions/functions";
import { useAudio } from "../../hooks/useAudio";

const AddMusicModal = ({ onClose }) => {
  const [showGenreMenu, setShowGenreMenu] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("Select genre");
  const [songImage, setSongImage] = useState(null);
  const [song, setSong] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const genreRef = useRef(null);
  const imageInputRef = useRef(null);
  const songInputRef = useRef(null);
  const { apiFetch, apiAxiosPost, user } = useAPI();
  const { genres } = useAudio();
const isCreateDisabled = !songTitle.trim() || !songImage || !song;


  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setShowGenreMenu(false);
  };

  // useEffect(() => {
  //   console.log("SONG: ", song);
  // }, [song]);

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

  const handleCreateClick = () => {
    // Відкриваємо підтвердження
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpload = async () => {
    setIsUploading(true);

    try {
      await submiteMusic(
        songTitle,
        song,
        songImage,
        selectedGenre,
        user.sub,
        apiFetch,
        apiAxiosPost
      );
      setIsConfirmModalOpen(false);
      onClose(); // Закриває обидва модальні вікна
    } catch (error) {
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
    onClose();
  };

  return (
    <div className={styles["amm-overlay"]}>
      {isUploading && (
        <div className={mainPageStyles["upload-modal"]}>
          <div className={mainPageStyles["upload-spinner"]}></div>
          <div className={mainPageStyles["upload-text"]}>Uploading...</div>
        </div>
      )}

      <div className={styles["amm-modal"]}>
        <div className={styles["amm-left"]}>
          <h3 className={styles["h3"]}>Add music</h3>

          <div className={styles["amm-photo"]}>
            {songImage && (
              <img
                className={mainPageStyles["preview-image"]}
                src={URL.createObjectURL(songImage)}
                alt="cover preview"
              />
            )}
          </div>

          <input
            style={{ display: "none" }}
            type="file"
            ref={imageInputRef}
            onChange={(e) => setSongImage(e.target.files[0])}
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
            placeholder="Name"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            maxLength={40}
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

          <input
            style={{ display: "none" }}
            type="file"
            ref={songInputRef}
            onChange={(e) => setSong(e.target.files[0])}
            accept="audio/*"
          />
          <button
            className={styles["music-file"]}
            onClick={() => songInputRef.current.click()}
          >
            {song ? song.name : "Music file"}
          </button>

          <div className={styles["cancel-create"]}>
            <button className={styles["cancel"]} onClick={onClose}>
              Cancel
            </button>
           <button
  className={`${styles["create"]} ${isCreateDisabled ? styles["disabled-button"] : ""}`}
  onClick={handleCreateClick}
  disabled={isCreateDisabled}
>
  Create
</button>

          </div>
        </div>
      </div>

      {/* === МОДАЛЬНЕ ПІДТВЕРДЖЕННЯ === */}
      {isConfirmModalOpen && (
        <div className={styles["confirm-overlay"]}>
          <div className={styles["confirm-modal"]}>
            <p className={styles["confirm-text"]}>
              Підтверджую, що я є власником цієї пісні або маю дозвіл на її публікацію.
              Уся відповідальність за авторські права лежить на мені.
            </p>

            <label className={styles["confirm-checkbox-label"]}>
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
              />
              Я погоджуюсь
            </label>

            <div className={styles["confirm-actions"]}>
              <button className={styles["cancel"]} onClick={handleCancelConfirm}>
                Скасувати
              </button>
              <button
                className={`${styles["confirm-button"]} ${
                  !isCheckboxChecked ? styles["disabled-button"] : ""
                }`}
                disabled={!isCheckboxChecked}
                onClick={handleConfirmUpload}
              >
                Підтвердити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMusicModal;
