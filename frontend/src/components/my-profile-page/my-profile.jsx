// MyProfile.jsx
import React from 'react';
import styles from './my-profile.module.css';

const MyProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles['left-side']}>
        <div className={styles['ava-place']}>
          <div className={styles.avatarka}></div>
        </div>
        <div className={styles['pages-btns-div']}>
          <div className={styles['btns-div']}>
            <div className={styles['page-btn']}></div>
            <div className={styles['page-btn']}></div>
            <div className={styles['page-btn']}></div>
            <div className={styles['page-btn']}></div>
            <div className={styles['page-btn']}></div>
          </div>
        </div>
        <div className={styles['song-place-div']}>
          <div className={styles['song-div']}>
            <div className={styles['song-name']}>Not Like Us</div>
            <div className={styles.singer}>Kendrick Lamar</div>
            <div className={styles['circle-song']}></div>
          </div>
        </div>
      </div>

      <div className={styles['empty-div1']}></div>

      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
            <div className={styles['edit-profile']}>Edit profile</div>
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
                <div className={styles['album-item']} key={index}>
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
              {Array.from({ length: 10 }).map((_, index) => (
                <div className={styles['song-item']} key={index}>
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

export default MyProfile;
