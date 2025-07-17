import React from 'react';
import styles from './MyProfile.module.css'; // Заміни на актуальний шлях

const AlbumItem = ({ idx }) => {
   return (
    <div className={styles['album-wrapper']} key={idx}>
      <div className={styles['album-item']}>
        <button className={styles['delete-item']}></button>
        {/* Можна тут поставити картинку або контент айтема */}
      </div>
      <div className={styles['it-container']}>
        <div className={styles['ait-name']}>Limits</div>
        <div className={styles['ait-author']}>John Watts</div>
      </div>
    </div>
  );
};

export default AlbumItem;
