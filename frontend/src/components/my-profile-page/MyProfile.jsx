
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
import PostItem from "../main-page/PostItem";
import AddAlbumModal from "./AddAlbumModal"
import AddMusicModal from "./AddMusicModal"
import FollowersModal from "./FollowersModal";

const MyProfile = ({ profileInfo }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const { user, isLoading } = useAuth0();
  const { apiFetch } = useAPI();
  const { setCurrentSong, setCurrentSongList } = useAudio();
  const [userFullInfo, setUserFullInfo] = useState("");
  const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("followers");

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

  const fetchPlaylists = async () => {
    const response = await apiFetch(`/playlists/playlists/${user.sub}`);
    const body = await response.json();
    // setPlaylists(body);
    fetchCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  };

  const fetchCurrentPlaylistTracks = async (currentPlaylist) => {
    const response = await apiFetch(`/tracks/tracks/${currentPlaylist.id}`);
    const body = await response.json();
    setSongs(body);
  };

  useEffect(() => {
    if (isLoading) return;

    fetchUser();
    fetchPlaylists();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <div className={styles["you-name"]}>{userFullInfo?.username}</div>
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

        <div className={styles['functional-container1']}>
          <div className={styles['saved-album-container']}>
            <div className={styles['svyazka']}>
              <div className={styles['saved-album-text']}>Saved Albums</div>
              <button className={styles['add-btn']} onClick={() => setShowModal1(true)}>Add +</button>
            </div>
            <div className={styles['album-array']}>
              {Array(12).fill(0).map((_, idx) => (
                <AlbumItem key={idx} />
              ))}
            </div>
          </div>


          {/* // <div className={styles["functional-container1"]}>
        //   <div className={styles["saved-album-container"]}>
        //     <div className={styles["saved-album-text"]}>Saved Albums</div>
        //     <div className={styles["album-array"]}>
        //       {Array(12)
        //         .fill(0)
        //         .map((_, idx) => (
        //           <AlbumItem key={idx} />
        //         ))}
        //     </div>
        //   </div> */}

          <div className={styles["saved-songs-container"]}>
            <div className={styles['svyazka']}>

              <div className={styles["saved-songs-text"]}>Saved Songs</div>
              <button className={styles['add-btn']} onClick={() => setShowModal(true)}>Add +</button>
            </div>
            <div className={styles["song-array"]}>
              {songs.map((song, index) => (
                <SongItem
                  key={song.id}
                  song={song}
                  moreInfo
                  onSetCurrentSongList={() => setCurrentSongList(songs)}
                />
              ))}
            </div>
          </div>
        </div>


        <div className={styles["bottom-place"]}>
          <div className={styles["posts-place"]}>
            <div className={styles["posts-text"]}>Posts</div>
            <PostItem selectedTab="user" />
            <div className={styles["posts-array"]}></div>
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

    </div>
  );
};

export default MyProfile;
