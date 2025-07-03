import React, { useState, useEffect, useRef } from "react";
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
  const [selectedTab, setSelectedTab] = useState("all");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState("all");

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

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

  const renderNotificationContent = () => {
    switch (notificationTab) {
      case "all":
        return <div>Notification: All</div>;
      case "likes":
        return <div>Notification: Likes</div>;
      case "comments":
        return <div>Notification: comments</div>;
      case "follows":
        return <div>Notification: follows</div>;
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
            <button
              className={styles.notification}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              Notification
            </button>

            <SearchModal
              isSearchModalOpen={isSearchModalOpen}
              setIsSearchModalOpen={setIsSearchModalOpen}
            />

            {isNotificationOpen && (
              <div
                className={styles.notificationMenu}
                ref={notificationRef}
              >
                <div className={styles.notificationHeader}>Notification</div>

                <div className={styles.notificationTabs}>
                  {["all", "likes", "comments", "follows"].map((tab) => (
                    <div
                      key={tab}
                      className={`${styles.notificationTab} ${
                        notificationTab === tab ? styles.active : ""
                      }`}
                      onClick={() => setNotificationTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                  ))}
                </div>

                <div className={styles.notificationContent}>
                  {renderNotificationContent()}
                </div>
              </div>
            )}
          </div>

          <div className={styles["empty-div3"]}></div>

          <ContainerVibe />
          <div className={styles["empty-div4"]}></div>
          <StoriesItem />
          <div className={styles["empty-div5"]}></div>

          <div className={styles["swipe-box"]}>
            <div
              className={`${styles["all-div"]} ${
                selectedTab === "all" ? styles.active : ""
              }`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </div>
            <div
              className={`${styles["artists-div"]} ${
                selectedTab === "artists" ? styles.active : ""
              }`}
              onClick={() => setSelectedTab("artists")}
            >
              Artists
            </div>
            <div
              className={`${styles["friends-div"]} ${
                selectedTab === "friends" ? styles.active : ""
              }`}
              onClick={() => setSelectedTab("friends")}
            >
              Friends
            </div>
          </div>

          <div className={styles["users-content"]}>{renderContent()}</div>
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
