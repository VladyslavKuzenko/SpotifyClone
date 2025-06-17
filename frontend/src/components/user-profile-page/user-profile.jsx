import React from 'react';
import styles from './user-profile.module.css';
import LeftSide from '../main-components/left-side';

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <LeftSide/>
      <div className={styles['empty-div1']}></div>
      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
          <div className={styles['hat-setting-platform']}>
            <div className={styles['setting-circles']}></div>
            <div className={styles['setting-circles']}></div>
            <div className={styles['setting-circles']}></div>
          </div>
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
            <div className={styles['follow-btn']}>Follow</div>
            <div className={styles['message-btn']}>Message</div>
          </div>
        </div>
        <div className={styles['functional-container1']}>
          <div className={styles['saved-album-container']}>
            <div className={styles['saved-album-text']}>Saved Albums</div>
            <div className={styles['album-array']}>
              {Array(13).fill(0).map((_, idx) => (
                <div className={styles['album-item']} key={idx}>
                  <div className={styles['it-container']}>
                    <div className={styles['ait-name']}>Limits</div>
                    <div className={styles['ait-author']}>John watts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles['saved-songs-container']}>
            <div className={styles['saved-songs-text']}>Saved Songs</div>
            <div className={styles['song-array']}>
              {Array(10).fill(0).map((_, idx) => (
                <div className={styles['song-item']} key={idx}>
                  <div className={styles['song-photo']}></div>
                  <div className={styles['name-artist']}>
                    <div className={styles['song-name-it']}>Song tittle</div>
                    <div className={styles['song-artist-it']}>Artist</div>
                  </div>
                  <div className={styles['listeners-count']}>102 664 992</div>
                  <div className={styles.plus}>+</div>
                  <div className={styles.duration}>13:58</div>
                  <div className={styles['more-menu']}>
                    <div className={styles['menu-plat']}>
                      <div className={styles['mp-circle']}></div>
                      <div className={styles['mp-circle']}></div>
                      <div className={styles['mp-circle']}></div>
                    </div>
                  </div>
                </div>
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