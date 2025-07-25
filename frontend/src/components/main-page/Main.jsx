import { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Stories from "./Stories";
import WhoToFollow from "./WhoToFollow";
import NewSongs from "./NewSongs";
import SearchModal from "./SearchModal";
import NewPost from "./NewPost";
import { useAPI } from "../../hooks/useApi";
import Posts from "./Posts";

const Main = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState("all");
  const { isProfileConfirmed, profileConfirmationLoading } = useAPI();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profileConfirmationLoading) {
    return <div>Loading profile...</div>;
  }

  if (!isProfileConfirmed) {
    return <Navigate to="/profileSetup" replace />;
  }

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
        <div className={styles["home-text"]}></div>

        <div className={styles.middle}>
          <div className={styles["empty-div2"]}>Home</div>

          <div className={styles.platform1} style={{ position: "relative" }}>
            <input
              type="text"
              onChange={(e) => {
                setSearchParams(e.target.value);
              }}
              value={searchParams}
              placeholder="Search"
              className={styles.search}
              onFocus={() => setIsSearchModalOpen(true)}
            />

            <div className={styles.mobileDisplay}>
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
            </div>
            <SearchModal
              isSearchModalOpen={isSearchModalOpen}
              setIsSearchModalOpen={setIsSearchModalOpen}
              searchParams={searchParams}
            />

            {isNotificationOpen && (
              <div className={styles.notificationMenu} ref={notificationRef}>
                <div className={styles.notificationHeader}>Notification</div>

                <div className={styles.notificationTabs}>
                  {["all", "likes", "comments", "follows"].map((tab) => (
                    <div
                      key={tab}
                      className={`${styles.notificationTab} ${notificationTab === tab ? styles.active : ""
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

          <div className={styles["empty-div4"]}></div>
          <Stories />
          <div className={styles["empty-div5"]}></div>

          <div className={styles["swipe-box"]}>
            <div
              className={`${styles["all-div"]} ${selectedTab === "all" ? styles.active : ""
                }`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </div>
            <div
              className={`${styles["artists-div"]} ${selectedTab === "artists" ? styles.active : ""
                }`}
              onClick={() => setSelectedTab("artists")}
            >
              Artists
            </div>
            <div
              className={`${styles["friends-div"]} ${selectedTab === "friends" ? styles.active : ""
                }`}
              onClick={() => setSelectedTab("friends")}
            >
              Friends
            </div>
          </div>

          <div className={styles["users-content"]}>
            <div className={styles["all-post-content"]}>
              <Posts selectedTab={selectedTab} />
            </div>
          </div>
        </div>

        <div className={styles["empty-div1"]}></div>

        <div className={styles["right-side"]}>
          <div className={styles["empty-div2"]}></div>
          <WhoToFollow />
          <NewSongs />
        </div>
      </div>

      {isPostModalOpen && <NewPost onClose={() => setIsPostModalOpen(false)} />}
    </>
  );
};

export default Main;
