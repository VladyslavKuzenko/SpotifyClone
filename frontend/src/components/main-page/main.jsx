// App.jsx
import React from "react";
import styles from "./main.module.css";
import LeftSide from "../main-components/LeftSide"
import StoriesItem from "./StoriesItem"
import WhoToFollow from "./WhoToFollow"
import NewSongs from "./NewSongs"
import ContainerVibe from "./ContainerVibe"
const Main = () => {
  return (
    <div className={styles.container}>
      <LeftSide />

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
       <ContainerVibe/>

        <div className={styles["empty-div4"]}></div>

       <StoriesItem/>

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

        <WhoToFollow/>


       <NewSongs/>


      </div>
    </div>
  );
};

export default Main;
