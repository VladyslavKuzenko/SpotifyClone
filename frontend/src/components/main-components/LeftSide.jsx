import React from "react";
import styles from "../main-page/main.module.css";
import MusicPlayer from "../sharedComponents/MusicPlayer";
import { useNavigate, useLocation } from "react-router-dom";

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- визначає поточний шлях

  return (
    <div className={styles["left-side"]}>
      <div className={styles["ava-place"]}>
        <div className={styles.avatarka}></div>
      </div>

      <div className={styles["pages-btns-div"]}>
        <button
          className={`${styles["home-btn"]} ${location.pathname === "/" ? styles["active1"] : ""}`}
          onClick={() => navigate("/")}
        ></button>

        <button
          className={`${styles["chat-btn"]} ${location.pathname === "/chat" ? styles["active1"] : ""}`}
          onClick={() => navigate("/chat")}
        ></button>

        <button
          className={`${styles["star-btn"]} ${location.pathname === "/rating" ? styles["active1"] : ""}`}
          onClick={() => navigate("/rating")}
        ></button>

        <button
          className={`${styles["playlist-btn"]} ${location.pathname === "/player" ? styles["active1"] : ""}`}
          onClick={() => navigate("/player")}
        ></button>

        <button
          className={`${styles["people-btn"]} ${location.pathname === "/edit-profile" ? styles["active1"] : ""}`}
          onClick={() => navigate("/edit-profile")}
        ></button>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default LeftSide;
