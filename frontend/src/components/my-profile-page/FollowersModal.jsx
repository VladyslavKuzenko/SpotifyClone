import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.css";
import FollowAccountCard from "../main-page/FollowAccountCard";
import { searchUsers } from "../../js/functions/functions";

const FollowersModal = ({
  activeTab,
  onClose,
  followersControl,
  followingsControl,
  userFullInfo,
}) => {
  const [tab, setTab] = useState(activeTab);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTab(activeTab);
    console.log("Followers: ", followersControl.followers);
    console.log("Followings: ", followingsControl.followings);
    console.log("UserFullInfo: ",userFullInfo)
  }, [activeTab]);

  return (
    <div className={styles["ffm-overlay"]} onClick={onClose}>
      <div className={styles["ffm-modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["ffm-header"]}>
          <button
            className={`${styles["ffm-tab"]} ${
              tab === "followers" ? styles["ffm-active"] : ""
            }`}
            onClick={() => setTab("followers")}
          >
            Followers
          </button>
          <button 
            className={`${styles["ffm-tab"]} ${
              tab === "followings" ? styles["ffm-active"] : ""
            }`}
            onClick={() => setTab("followings")}
          >
            Followings
          </button>
          <button className={styles["ffm-close"]} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles["ffm-content"]}>
          <input
            type="text"
            className={styles["ffm-input"]}
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchUsers(userFullInfo.followers,e.target.value,followersControl.setFollowers)
              searchUsers(userFullInfo.followings,e.target.value,followingsControl.setFollowings)
              // searchSongs(songsFullList, e.target.value, setSongs);
            }}
          />
          {tab === "followers" ? (
            <>
              
              {followersControl.followers.map((i) => (
                <FollowAccountCard userToFollow={i} key={i.id} />
              ))}
            </>
          ) : (
            <>
              {/* <div>Followings</div> */}
              {followingsControl.followings.map((i) => (
                <FollowAccountCard userToFollow={i} key={i.id}/>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
