import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.css";

const FollowersModal = ({ activeTab, onClose }) => {
  const [tab, setTab] = useState(activeTab);

  useEffect(() => {
    setTab(activeTab);
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
              tab === "follows" ? styles["ffm-active"] : ""
            }`}
            onClick={() => setTab("follows")}
          >
            Follows
          </button>
          <button className={styles["ffm-close"]} onClick={onClose}>
            ✕
          </button>
        </div>


        <div className={styles["ffm-content"]}>
          <input type="text" className={styles["ffm-input"]} placeholder="Search"/>
          {tab === "followers" ? (
            <div>Followers</div>
          ) : (
            <div>Follows</div>
          )}
        </div>
      </div>


    </div>
  );
};

export default FollowersModal;
