import React from 'react';
import styles from './user-profile.module.css'; // Заміни на актуальний шлях

const SongItem = ({ idx }) => {
  return (
    <div className={styles['song-item']} key={idx}>
      <div className={styles['song-photo']}></div>

      <div className={styles['name-artist']}>
        <div className={styles['song-name-it']}>Song tittle</div>
        <div className={styles['song-artist-it']}>Artist</div>
      </div>

      <div className={styles['listeners-count']}>102 664 992</div>

      <button className={styles.plus}>+</button>

      <div className={styles.duration}>13:58</div>

      <div className={styles['more-menu']}>
        <button className={styles['menu-plat']}>
          <div className={styles['mp-circle']}></div>
          <div className={styles['mp-circle']}></div>
          <div className={styles['mp-circle']}></div>
        </button>
      </div>
    </div>
  );
};

export default SongItem;
