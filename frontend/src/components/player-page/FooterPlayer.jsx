import React, { useState } from "react";
import styles from "./player.module.css"; // заміни на свій шлях до CSS
import AudioControl from "./AudioControl";

// Простий модальний компонент
const Modal = ({ onClose, song }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

        <div className={styles["foot-left"]}>
          <div className={styles["foot-photo"]}></div>

          <div className={styles["foot-bcontent"]}>
            <div className={styles["foot-songartist"]}>
              <div className={styles["foot-song"]}>Song tittle</div>
              <div className={styles["foot-artist"]}>Song artist</div>

            </div>
            <div className={styles["foot-likeslisteners"]}>
              <div className={styles["foot-likes"]}>520204 likes</div>
              <div className={styles["foot-listeners"]}>14784235 listeners</div>
            </div>
          </div>

        </div>


        <div className={styles["foot-right"]}>

          <div className={styles["tab-content"]}>
            <button className={styles["up-next-btn"]}>Up next</button>
          </div>

          <div className={styles["foot-array"]}>
            {[...Array(16)].map((_, i) => (
              <div key={i} className={styles["songfsdfs"]}></div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

const FooterPlayer = ({ songControl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles["footer-container"]}>
      <div className={styles["mr-bottom"]}>
        <div className={styles["mrb-left"]} onClick={handleOpenModal}>
          <div className={styles["bmr-cover"]}></div>
          <div className={styles["bmr-song-info"]}>
            <div className={styles["bmr-title"]}>{songControl.currentSong.title}</div>
            <div className={styles["bmr-artist"]}>{songControl.currentSong?.artist?.user?.username}</div>
          </div>
        </div>

        <AudioControl
          songControl={{
            currentSong: songControl.currentSong,
            nextSong: songControl.nextSong,
            prevSong: songControl.prevSong,
          }}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} song={songControl.currentSong} />
      )}
    </div>
  );
};

export default FooterPlayer;
