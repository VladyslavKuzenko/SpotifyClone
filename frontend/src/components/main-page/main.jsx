// App.jsx
import React from "react";
import styles from "./main.module.css";
import LeftSide from "../main-components/left-side"

const Main = () => {
  return (
    <div className={styles.container}>
      <LeftSide/>

      <div className={styles["home-text"]}>
        <div className={styles["text-home"]}>Home</div>
      </div>

      <div className={styles.middle}>
        <div className={styles["empty-div2"]}></div>
        <div className={styles.platform1}>
          <input
            type="search"
            placeholder="Search"
            class="search"
            className={styles.search}
          />
          <div className={styles["new-post"]}>+ New post</div>
          <div className={styles.notification}>Notification</div>
        </div>
        <div className={styles["empty-div3"]}></div>
        <div className={styles["container-vibe"]}>
          <div className={styles["vibe-div"]}>#dreamy</div>
          <div className={styles["vibe-div"]}>#newrelease</div>
          <div className={styles["vibe-div"]}>#energetic</div>
          <div className={styles["vibe-div"]}>#hiphop</div>
          <div className={styles["vibe-div"]}>#rap</div>
          <div className={styles["vibe-div"]}>#classical</div>
        </div>

        <div className={styles["empty-div4"]}></div>
        <div className={styles["container-stories"]}>
          {["Kendrick Lamar", "NovakPro", "2Pac", "21 Savage", "Eminem", "Zelenskiy"].map((name) => (
            <div className={styles["stories-plat"]} key={name}>
              <div className={styles.stories}></div>
              <div className={styles.nickname}>{name}</div>
            </div>
          ))}
        </div>

        <div className={styles["empty-div5"]}></div>

        <div className={styles["swipe-box"]}>
          <div className={styles["all-div"]}>All</div>
          <div className={styles["artists-div"]}>Artists</div>
          <div className={styles["friends-div"]}>Friends</div>
        </div>
        <div className={styles["users-content"]}></div>
      </div>

      <div className={styles["empty-div1"]}></div>

      <div className={styles["right-side"]}>
        <div className={styles["empty-div2"]}></div>

        <div className={styles["who-to-follow-div"]}>
          <div className={styles["who-to-follow-text"]}>Who to follow</div>
          <div className={styles["empty-div6"]}></div>
          <div className={styles["who-to-follow-accounts"]}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div className={styles["account-platform"]} key={index}>
                <div className={styles["place-for-ava"]}>
                  <div className={styles["ava-follow"]}></div>
                </div>
                <div className={styles["name-nickname"]}>
                  <div className={styles["name-follow"]}>Name follow</div>
                  <div className={styles["nickname-follow"]}>
                    @nickname-follow
                  </div>
                </div>
                <div className={styles["follow-btn"]}>Follow</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["new-song-div"]}>
          <div className={styles["ns-text1"]}>New</div>
          <div className={styles["ns-middle"]}></div>
          <div className={styles["ns-bottom"]}>
            <div className={styles["ns-song-author"]}>
              <div className={styles["ns-song"]}>Harlequin</div>
              <div className={styles["ns-author"]}>Lady Gaga</div>
            </div>
            <div className={styles["ns-play-btn-div"]}>
              <div className={styles["ns-play-btn"]}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
