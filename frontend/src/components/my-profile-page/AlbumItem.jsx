import React from 'react';
import styles from './MyProfile.module.css'; // Заміни на актуальний шлях

const AlbumItem = ({ idx }) => {
  return (
    <div className={styles['album-item']} key={idx}>
      <button className={styles['delete-item']}></button>
      <div className={styles['it-container']}>
        <div className={styles['ait-name']}>Limits</div>
        <div className={styles['ait-author']}>John watts</div>
      </div>
    </div>
  );
};

export default AlbumItem;
