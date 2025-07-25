import React, { useState, useEffect, useRef } from "react";
import styles from "./user-profile.module.css";
import LeftSide from "../main-components/LeftSide";
import { useNavigate, useParams } from "react-router-dom";
import { useAPI } from "../../hooks/useApi";
import FollowingButton from "../sharedComponents/FollowingButton";
import UserLikedMediaLibrary from "../my-profile-page/UserLikedMediaLibrary";
import Posts from "../main-page/Posts";
import ArtistOwnMediaLibrary from "../my-profile-page/ArtistOwnMediaLibrary";
const UserProfile = () => {
  const { userId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userFullInfo, setUserFullInfo] = useState("");
  const { apiFetch, user } = useAPI();
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!userId) return;
    fetchUserFullInfo();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navigate = useNavigate();

  const fetchUserFullInfo = async () => {
    const respose = await apiFetch(`/users/${userId}`);
    const data = await respose.json();
    setUserFullInfo(data);
  };
  // const isArtist = true; //перевіка

  const handleMessageClick = async () => {
    const response = await apiFetch("/chats/private", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user1Id: user.sub,
        user2Id: userId
      })
    });

    const chat = await response.json();
    console.log(chat);
    
    navigate("/chat", { state: { openChatId: chat.id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles["empty-div1"]}></div>
      <div className={styles["profile-side"]}>
        <div className={styles["channel-hat"]}>
          <div className={styles["menu-wrapper"]} ref={menuRef}>
            <button
              className={styles["hat-setting-platform"]}
              onClick={toggleMenu}
            >
              <div className={styles["setting-circles"]}></div>
              <div className={styles["setting-circles"]}></div>
              <div className={styles["setting-circles"]}></div>
            </button>

            {menuOpen && (
              <div className={styles["dropdown-menu"]}>
                <button className={styles["dropdown-item"]}>Share</button>
              </div>
            )}
          </div>

          <img
            src={userFullInfo.avatarImgUrl}
            className={styles["profile-photo"]}
          />
        </div>

        <div className={styles["nbf-cont"]}>
          <div className={styles["name-bio"]}>
            <div className={styles["profile-name"]}>
              {userFullInfo.username}
            </div>
            {/* <div className={styles["profile-bio"]}>{userFullInfo.shortBio}</div> */}
          </div>
          <div className={styles["followers-count"]}>
            {userFullInfo.followersCount} followers
          </div>
          <div className={styles["follow-message-container"]}>
            <FollowingButton
              userToFollow={userFullInfo}
              styles={styles["follow-btn"]}
            />
            <button className={styles["message-btn"]} onClick={handleMessageClick}>
              Message
            </button>
          </div>
        </div>
        
        <div className={styles["functional-container1"]}></div>
        {userFullInfo.isArtist ? (
          <ArtistOwnMediaLibrary userToShowProfile={userFullInfo} />
        ) : (
          <UserLikedMediaLibrary userToShowProfile={userFullInfo} />
        )}

        <div className={styles["bottom-place"]}>
          <div className={styles["posts-place"]}>
            <div className={styles["posts-text"]}>Posts</div>
            <Posts selectedTab="user" userId={userId} />
          </div>
          <div className={styles["groups-place"]}>
            <div className={styles["groups-text"]}>Groups</div>
            <div className={styles["groups-container"]}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className={styles["grp-hiphop-heads"]}>
                  <div className={styles["grp-avatar"]}></div>
                  <div className={styles["grp-info"]}>
                    <div className={styles["grp-name"]}>Hip-Hop Heads</div>
                    <div className={styles["grp-followers"]}>
                      35477 followers
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
