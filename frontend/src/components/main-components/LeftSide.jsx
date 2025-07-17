import React, { useState } from "react";
import styles from "../main-page/main.module.css";
import MusicPlayer from "../sharedComponents/MusicPlayer";
import { useNavigate, useLocation } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles["left-side"]} onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={styles["ava-place"]} >
        <div className={styles.avatarka} onClick={() => navigate("/my-profile")}></div>
      </div>

      <div className={styles["pages-btns-div"]}>
        <button
          className={`${styles["menu-btn"]} ${location.pathname === "/" ? styles.active1 : ""}`}
          onClick={() => navigate("/")}
        >
          <span className={`${styles.icon} ${styles.homeIcon}`}></span>
          <span className={styles.label}>Home</span>
        </button>

        <button
          className={`${styles["menu-btn"]} ${location.pathname === "/player" ? styles.active1 : ""}`}
          onClick={() => navigate("/player")}
        >
          <span className={`${styles.icon} ${styles.playerIcon}`}></span>
          <span className={styles.label}>Player</span>
        </button>

        <button
          className={`${styles["menu-btn"]} ${location.pathname === "/my-profile" ? styles.active1 : ""}`}
          onClick={() => navigate("/my-profile")}
        >
          <span className={`${styles.icon} ${styles.profileIcon}`}></span>
          <span className={styles.label}>Profile</span>
        </button>

        <button
          className={`${styles["menu-btn"]} ${location.pathname === "/rating" ? styles.active1 : ""}`}
          onClick={() => navigate("/rating")}
        >
          <span className={`${styles.icon} ${styles.ratingIcon}`}></span>
          <span className={styles.label}>Rating</span>
        </button>

        <button className={styles["menu-btn"]} onClick={() => navigate("/chat")}>
          <span className={`${styles.icon} ${styles.chatIcon}`}></span>
          <div className={styles.label}>Chats</div>
        </button>
      </div>

      <MusicPlayer isHovered={isHovered} />
    </div>
  );
};

export default LeftSide;
