// MyProfile.jsx
import React from 'react';
import styles from './MyProfile.module.css';
import LeftSide from '../main-components/LeftSide';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem'
const MyProfile = () => {
  return (
    <div className={styles.container}>
      <LeftSide />

      <div className={styles['empty-div1']}></div>

      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
          <button className={styles['edit-profile']}>Edit profile</button>
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
            <div className={styles['saved-album-text']}>Saved Albums</div>
            <div className={styles['album-array']}>
              {Array.from({ length: 13 }).map((_, index) => (
                <AlbumItem />
              ))}
            </div>
          </div>

          <div className={styles['saved-songs-container']}>
            <div className={styles['saved-songs-text']}>Saved Songs</div>
            <div className={styles['song-array']}>
              {Array.from({ length: 10 }).map((_, index) => (
                <SongItem />
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
            <div className={styles['group-text']}></div>
            <div className={styles['groups-container']}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
