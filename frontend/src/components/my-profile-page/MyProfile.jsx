// MyProfile.jsx
import React, { useEffect, useState, useRef } from "react";
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

  const { isLoading } = useAuth0();
  const { apiFetch, user } = useAPI();
  const [userFullInfo, setUserFullInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");
  const [activeTab1, setActiveTab1] = useState("profile");
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
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

    const responseUserFollowers = await apiFetch(
      `/users/userFollowers/${user.sub}`
    );
    const followers = await responseUserFollowers.json();

    const responseUserFollowings = await apiFetch(
      `/users/userFollowing/${user.sub}`
    );
    const followings = await responseUserFollowings.json();

    const responseArtist = await apiFetch(`/artists/${user.sub}`);
    const artist = await responseArtist.json();

    const newData = { ...data, artist, followers, followings };
    setUserFullInfo(newData);
    setFollowings(followings);
    setFollowers(followers);
    console.log("User: ", user);
    console.log("User full info: ", newData);
  };
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

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
            onClick={toggleMenu}
          >
            <div className={styles["setting-circles"]}></div>
            <div className={styles["setting-circles"]}></div>
            <div className={styles["setting-circles"]}></div>


          </button>

          <img
            src={userFullInfo.avatarImgUrl}
            className={styles["profile-photo"]}
          />
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
            {userFullInfo.followingsCount} followings
          </div>
        </div>

        {isModalOpen && (
          <FollowersModal
            activeTab={activeTab}
            onClose={closeModal}
            followersControl={{ followers, setFollowers }}
            followingsControl={{ followings, setFollowings }}
            userFullInfo={userFullInfo}
          />
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
              {activeTab1 === "profile" && <UserLikedMediaLibrary user={userFullInfo} />}

              {activeTab1 === "artistTools" && <ArtistOwnMediaLibrary />}
            </div>
          </div>
        ) : (
          //перевірка не артист
          <>
            <UserLikedMediaLibrary user={userFullInfo} />
          </>
        )}
        <div className={styles["about-artist-platform"]}>
          <div className={styles["aap-left"]}>
            <div className={styles["aap-text"]}>About artist</div>
            <img className={styles["aap-photo"]} src={userFullInfo?.artist?.aboutImgUrl} />
          </div>
          <div className={styles["aap-right"]}>
            <div className={styles["aap-information"]}>
              {userFullInfo?.artist?.aboutArtist}
            </div>
            <div className={styles["aap-socials"]}>
              <a className={styles["facebook"]} href={userFullInfo?.artist?.facebookLink}></a>
              <a className={styles["instagram"]} href={userFullInfo?.artist?.instagramLink}></a>
              <a className={styles["twitter"]} href={userFullInfo?.artist?.twitterLink}></a>
            </div>

            <button
              className={styles["aap-edit"]}
              onClick={() => setShowModal2(true)}
            >
              Edit
            </button>
          </div>
        </div>

        <div className={styles["bottom-place"]}>
          <div className={styles["posts-place"]}>
            <div className={styles["posts-text"]}>Posts</div>
            <div className={styles["posts-array"]}>
              <Posts selectedTab="user" userId={user?.sub} isProfilePage={true} />
            </div>
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
      {menuOpen && (
        <div className={styles["dropdown-menu"]} ref={menuRef}>
          <button className={styles["dropdown-item"]} onClick={() => navigate("/edit-profile")}>Edit profile</button>
          <button className={styles["dropdown-item"]}>Share</button>
          <button className={styles["dropdown-item"]}>Logout</button>

        </div>
      )}
      {showModal && <AddMusicModal onClose={() => setShowModal(false)} />}
      {showModal1 && <AddAlbumModal onClose={() => setShowModal1(false)} />}
      {showModal2 && (
        <EditAboutModal
          artist={userFullInfo.artist}
          onClose={() => setShowModal2(false)}
        />
      )}
    </div>
  );
};

export default MyProfile;
