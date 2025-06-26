import React from 'react';
import styles from './user-profile.module.css';
import LeftSide from '../main-components/LeftSide';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles['empty-div1']}></div>
      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
          <button className={styles['hat-setting-platform']}>
            <div className={styles['setting-circles']}></div>
            <div className={styles['setting-circles']}></div>
            <div className={styles['setting-circles']}></div>
          </button>
          <div className={styles['profile-photo']}>
            <div className={styles.status}></div>
          </div>
        </div>
        <div className={styles['nbf-cont']}>
          <div className={styles['name-bio']}>
            <div className={styles['profile-name']}>Jane Doe</div>
            <div className={styles['profile-bio']}>Nisi ut aliquip ex ea commodo consequatt in</div>
          </div>
          <div className={styles['followers-count']}>999k followers</div>
          <div className={styles['follow-message-container']}>
            <button className={styles['follow-btn']}>Follow</button>
            <button className={styles['message-btn']}>Message</button>
          </div>
        </div>
        <div className={styles['functional-container1']}>
          <div className={styles['saved-album-container']}>
            <div className={styles['saved-album-text']}>Saved Albums</div>
            <div className={styles['album-array']}>
              {Array(12).fill(0).map((_, idx) => (
                <AlbumItem />
              ))}
            </div>
          </div>
          <div className={styles['saved-songs-container']}>
            <div className={styles['saved-songs-text']}>Saved Songs</div>
            <div className={styles['song-array']}>
              {Array(10).fill(0).map((_, idx) => (
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

export default UserProfile;