import React, { useState, useEffect, useRef } from 'react';
import styles from './user-profile.module.css';
import LeftSide from '../main-components/LeftSide';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';

const UserProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={styles.container}>
      {/* <LeftSide /> */}
      <div className={styles['empty-div1']}></div>
      <div className={styles['profile-side']}>
        <div className={styles['channel-hat']}>
          <div className={styles['menu-wrapper']} ref={menuRef}>
            <button className={styles['hat-setting-platform']} onClick={toggleMenu}>
              <div className={styles['setting-circles']}></div>
              <div className={styles['setting-circles']}></div>
              <div className={styles['setting-circles']}></div>
            </button>

            {menuOpen && (
              <div className={styles['dropdown-menu']}>
                <button className={styles['dropdown-item']}>Edit Profile</button>
                <button className={styles['dropdown-item']}>Share</button>
                <button className={styles['dropdown-item']}>Settings</button>
                <button className={styles['dropdown-item']}>Logout</button>
              </div>
            )}
          </div>

          <div className={styles['profile-photo']}>
            <div className={styles.status}></div>
          </div>
        </div>

        <div className={styles['nbf-cont']}>
          <div className={styles['name-bio']}>
            <div className={styles['profile-name']}>Jane Doe</div>
            <div className={styles['profile-bio']}>Nisi ut aliquip ex ea commodo consequatt in mmmmmmmmmmmmmmmmmmmmm</div>
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
                <AlbumItem key={idx} />
              ))}
            </div>
          </div>
          <div className={styles['saved-songs-container']}>
            <div className={styles['saved-songs-text']}>Saved Songs</div>
            <div className={styles['song-array']}>
              {Array(10).fill(0).map((_, idx) => (
                <SongItem key={idx} />
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
    </div>
  );
};

export default UserProfile;
