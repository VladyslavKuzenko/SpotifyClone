import React from 'react';
import styles from './MyProfile.module.css'; // Заміни на актуальний шлях
import mainPageStyles from "../main-page/main.module.css";

const AlbumItem = ({album, idx ,onClickFunck}) => {
  console.log("AlbumItem: ",album)
   return (
    <div className={styles['album-wrapper']} key={idx} onClick={()=>onClickFunck?.()}>
  <div className={styles['album-item']}> 
    <button className={styles['save-to-library']}></button>
    {album?.imageUrl && (
      <img
        className={mainPageStyles["preview-image-album"]}
        src={album.imageUrl}
        alt=""
      />
    )}
  </div>
  <div className={styles['it-container']}>
    <div className={styles['ait-name']}>{album?.title}</div>
    <div className={styles['ait-author']}>{album?.artist.user.username}</div>
  </div>
</div>
  );
};

export default AlbumItem;
