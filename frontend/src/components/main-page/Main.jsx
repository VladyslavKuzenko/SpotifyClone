import React, { useState } from "react";
import styles from "./main.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import LeftSide from "../main-components/LeftSide";
import StoriesItem from "./StoriesItem";
import WhoToFollow from "./WhoToFollow";
import NewSongs from "./NewSongs";
import ContainerVibe from "./ContainerVibe";
import SearchModal from "./SearchModal";
import NewPost from "./NewPost";

const Main = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Новий стан для вибору вкладки
  const [selectedTab, setSelectedTab] = useState("all");

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Функція для рендера контенту в users-content залежно від selectedTab
  const renderContent = () => {
    switch (selectedTab) {
      case "all":
        return <div>Це контент для All</div>;
      case "artists":
        return <div>Це контент для Artists</div>;
      case "friends":
        return <div>Це контент для Friends</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.container}>
        <LeftSide />

        <div className={styles["home-text"]}>
          <div className={styles["text-home"]}>Home</div>
        </div>

        <div className={styles.middle}>
          <div className={styles["empty-div2"]}></div>

          <div className={styles.platform1} style={{ position: "relative" }}>
            <input
              type="search"
              placeholder="Search"
              className={styles.search}
              onFocus={() => setIsSearchModalOpen(true)}
            />
            <button
              className={styles["new-post"]}
              onClick={() => setIsPostModalOpen(true)}
            >
              + New post
            </button>
            <button className={styles.notification}>Notification</button>

            <SearchModal
              isSearchModalOpen={isSearchModalOpen}
              setIsSearchModalOpen={setIsSearchModalOpen}
            />
          </div>

          <div className={styles["empty-div3"]}></div>

          <ContainerVibe />
          <div className={styles["empty-div4"]}></div>
          <StoriesItem />
          <div className={styles["empty-div5"]}></div>

          <div className={styles["swipe-box"]}>
            <div
              className={`${styles["all-div"]} ${selectedTab === "all" ? styles.active : ""}`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </div>
            <div
              className={`${styles["artists-div"]} ${selectedTab === "artists" ? styles.active : ""}`}
              onClick={() => setSelectedTab("artists")}
            >
              Artists
            </div>
            <div
              className={`${styles["friends-div"]} ${selectedTab === "friends" ? styles.active : ""}`}
              onClick={() => setSelectedTab("friends")}
            >
              Friends
            </div>
          </div>

          <div className={styles["users-content"]}>
            {renderContent()}
          </div>
        </div>

        <div className={styles["empty-div1"]}></div>

        <div className={styles["right-side"]}>
          <div className={styles["empty-div2"]}></div>
          <WhoToFollow />
          <NewSongs />
        </div>
      </div>

      {isPostModalOpen && (
        <NewPost onClose={() => setIsPostModalOpen(false)} />
      )}
    </>
  );
};

export default Main;
