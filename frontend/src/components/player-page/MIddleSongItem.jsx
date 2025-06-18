import React from 'react';
import styles from './player.module.css'; // Заміни на фактичний шлях

const MiddleSongItem = ({onSongSelect, i }) => {
    return (
        <button key={i} className={styles['as-song-item']} onClick={()=>onSongSelect("Recomended song")}>
            <div className={styles['as-song-photo']}></div>

            <div className={styles['as-name-artist']}>
                <div className={styles['as-song-name-it']}>Song tittle</div>
                <div className={styles['as-song-artist-it']}>Artist</div>
            </div>

            <div className={styles['as-listeners-count']}>
                102 664 992
            </div>

            <div className={styles['as-plus-plat']}>
                <div className={styles['as-plus']} >+
                </div>

            </div>

            <div className={styles['as-duration']}>13:58</div>

            <div className={styles['as-more-menu']}>
                <div className={styles['as-menu-plat']}>
                    <div className={styles['as-mp-circle']}></div>
                    <div className={styles['as-mp-circle']}></div>
                    <div className={styles['as-mp-circle']}></div>
                </div>
            </div>
        </button>
    );
};

export default MiddleSongItem;
