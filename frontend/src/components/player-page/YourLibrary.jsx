import React, { useState } from "react";
import styles from "./player.module.css";
import SongItem from "./SongItem";
import { searchSongs } from "../../js/functions/functions";

const YourLibrary = ({ songsList, onSongSelect, onSetCurrentAlbum }) => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState(songsList);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles["playlist-element"]}>
                playlist
              </div>
            ))}
          </div>

          <div className={styles["search-recent"]}>
            <div className={styles["sr-search"]}>
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                  searchSongs(songsList, e.target.value, setSongs);
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
                onSetCurrentAlbum={() => {
                  onSetCurrentAlbum(songs);
                }}
              />
            ))}
          </div>
        </div>
      </div>



      {isModalOpen && (
        <div className={styles["modal-overlay"]} onClick={() => setIsModalOpen(false)}>
          <div
            className={styles["modal-window"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-left-side"]}>
              <div className={styles["modal-text"]}> New playlist</div>
              <div className={styles["modal-image"]}>
                <div className={styles["playlist-img"]}></div>
                <button className={styles["playlist-btn"]}>Select image </button>

              </div>
            </div>


            <div className={styles["modal-right-side"]}>
              <div className={styles["empty-modal1"]}></div>
              <div className={styles["name-desc"]}>

                <input type="text" className={styles["playlist-name"]} name="" id="" placeholder="Name" />
                <input type="text" className={styles["playlist-description"]} name="" id="" placeholder="Description" />
              </div>

              <div className={styles["access"]}>
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



              </div>

              <div className={styles["cancel-create"]}> 
             <button  className={styles["cancel-btn"]} onClick={() => setIsModalOpen(false)}>Cancel</button> 
             <button className={styles["create-btn"]}>Create</button>


              </div>




              </div>


            </div>
          </div>
      )}
        </>
      );
};

      export default YourLibrary;
