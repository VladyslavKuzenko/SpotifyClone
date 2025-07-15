import React, { useState } from 'react';
import styles from './MyProfile.module.css';
import LeftSide from '../main-components/LeftSide';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem'
import { useNavigate } from "react-router-dom";
import AddMusicModal from './AddMusicModal';
import AddAlbumModal from './AddAlbumModal';
const MyProfile = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  return (
    <div className={styles.container}>
      {/* <LeftSide /> */}

      <div className={styles['empty-div1']}></div>

      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
          <button className={styles['edit-profile']} onClick={() => navigate("/edit-profile")}>Edit profile</button>
          <div className={styles['profile-photo']}></div>
          <div className={styles['you-name']}>You</div>
        </div>

        <div className={styles['profile-bio']}>
          Nisi ut aliquip ex ea commodo consequatt in
        </div>

        <div className={styles['followers-follows']}>
          <div className={styles['ff-followers']}>999k followers</div>
          <div className={styles['ff-follows']}>2k follows</div>
        </div>

        <div className={styles['functional-container1']}>
          <div className={styles['saved-album-container']}>
            <div className={styles['svyazka']}>
              <div className={styles['saved-album-text']}>Your Albums</div>
              <button className={styles['add-btn']} onClick={() => setShowModal1(true)}>Add +</button>
            </div>
            <div className={styles['album-array']}>
              {Array(12).fill(0).map((_, idx) => (
                <AlbumItem key={idx} />
              ))}
            </div>
          </div>

          <div className={styles['saved-songs-container']}>
            <div className={styles['svyazka']}>
              <div className={styles['saved-songs-text']}>Your Songs</div>
              <button className={styles['add-btn']} onClick={() => setShowModal(true)}>Add +</button>
            </div>
            <div className={styles['song-array']}>
              {Array.from({ length: 10 }).map((_, index) => (
                <SongItem key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles['bottom-place']}>
          <div className={styles['posts-place']}>
            <div className={styles['posts-text']}>Posts</div>
            <div className={styles['posts-array']}></div>
          </div>
          <div className={styles['groups-place']}>
            <div className={styles['groups-text']}>Groups</div>
            <div className={styles['groups-container']}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className={styles["grp-hiphop-heads"]}>
                  <div className={styles["grp-avatar"]}></div>
                  <div className={styles["grp-info"]}>
                    <div className={styles["grp-name"]}>Hip-Hop Heads</div>
                    <div className={styles["grp-followers"]}>35477 followers</div>
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
