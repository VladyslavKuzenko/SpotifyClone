// MyProfile.jsx
import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import LeftSide from "../main-components/LeftSide";
import AlbumItem from "./AlbumItem";
import { useNavigate, useLocation } from "react-router-dom";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAudio } from "../../hooks/useAudio";
import SongItem from "../player-page/SongItem";
import Posts from "../main-page/Posts";
import AddAlbumModal from "./AddAlbumModal";
import AddMusicModal from "./AddMusicModal";
import FollowersModal from "./FollowersModal";
import UserLikedMediaLibrary from "./UserLikedMediaLibrary";
import ArtistOwnMediaLibrary from "./ArtistOwnMediaLibrary";
import EditAboutModal from "./EditAboutModal";
const MyProfile = ({ profileInfo }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const { user, isLoading } = useAuth0();
  const { apiFetch } = useAPI();
  const [userFullInfo, setUserFullInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  const [activeTab1, setActiveTab1] = useState("profile");

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchUser = async () => {
    const respose = await apiFetch(`/users/${user.sub}`);
    const data = await respose.json();
    setUserFullInfo(data);

    console.log("User: ", user);
    console.log("User full info: ", data);
  };


  useEffect(() => {
    if (isLoading) return;

    fetchUser();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isArtist = true; //перевірка чи артист

  return (
    <div className={styles.container}>
      <div className={styles["empty-div1"]}></div>

      <div className={styles["profile-side"]}>
        <div className={styles["channel-hat"]}>
          <button
            className={styles["edit-profile"]}
            onClick={() => navigate("/edit-profile")}
          >
            Edit profile
          </button>
          {/* <div className={styles["profile-photo"]}></div> */}
          <img src={userFullInfo.uiTheme} className={styles["profile-photo"]} />
          <div className={styles["you-name"]}>@{userFullInfo?.username}</div>
        </div>

        <div className={styles["profile-bio"]}>{userFullInfo?.shortBio}</div>

        <div className={styles["followers-follows"]}>
          <div
            className={styles["ff-followers"]}
            onClick={() => openModal("followers")}
          >
            {userFullInfo?.followersCount} followers
          </div>
          <div
            className={styles["ff-follows"]}
            onClick={() => openModal("follows")}
          >
            {userFullInfo.followingsCount} follows
          </div>
        </div>

        {isModalOpen && (
          <FollowersModal activeTab={activeTab} onClose={closeModal} />
        )}

        {isArtist ? ( //перевірка артист
          <div>
            {/* Вкладки */}
            <div className={styles["tabs-container"]}>
              <div className={styles["tabs-palce"]}>
                <button
                  className={
                    activeTab1 === "profile"
                      ? styles["tab-active"]
                      : styles["tab"]
                  }
                  onClick={() => setActiveTab1("profile")}
                >
                  Favorites
                </button>
                <button
                  className={
                    activeTab1 === "artistTools"
                      ? styles["tab-active"]
                      : styles["tab"]
                  }
                  onClick={() => setActiveTab1("artistTools")}
                >
                  My Releases
                </button>
              </div>
            </div>

            {/* Контент вкладок */}
            <div className={styles["tab-content"]}>
              {activeTab1 === "profile" && <UserLikedMediaLibrary />}

              {activeTab1 === "artistTools" && <ArtistOwnMediaLibrary />}
            </div>
          </div>
        ) : (
          //перевірка не артист
          <>
            <UserLikedMediaLibrary />

          </>
        )}
        <div className={styles["about-artist-platform"]}>
          <div className={styles["aap-left"]}>
            <div className={styles["aap-text"]}>About artist</div>
            <div className={styles["aap-photo"]}></div>
          </div>
          <div className={styles["aap-right"]}>
            <div className={styles["aap-information"]}>Max has quickly risen to prominence as a leading artist of the modern music scene. Her debut album, "Whispers in the Wind," showcases 12 original tracks that blend pop and indie influences, all crafted in her cozy studio in Nashville. In 2020, her first single "Chasing Stars" topped the charts in 15 countries, making her a household name. Following that success, her sophomore album, "Echoes of Tomorrow," released in 2022, debuted at No. 1 globally and received rave reviews from critics and fans alike. Max's unique sound and heartfelt lyrics continue to resonate with audiences around the world.</div>
            <div className={styles["aap-socials"]}>
              <button className={styles["facebook"]}></button>
              <button className={styles["instagram"]}></button>
              <button className={styles["twitter"]}></button>
            </div>

            <button className={styles["aap-edit"]} onClick={() => setShowModal2(true)}>Edit</button>


          </div>

        </div>

        <div className={styles["bottom-place"]}>



          <div className={styles["posts-place"]}>
            <div className={styles["posts-text"]}>Posts</div>
            <Posts selectedTab="user" userId={user?.sub} />
            {/* <div className={styles["posts-array"]}></div> */}
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
      {showModal && <AddMusicModal onClose={() => setShowModal(false)} />}
      {showModal1 && <AddAlbumModal onClose={() => setShowModal1(false)} />}
      {showModal2 && <EditAboutModal onClose={() => setShowModal2(false)} />}

    </div>
  );
};

export default MyProfile;
