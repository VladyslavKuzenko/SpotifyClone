import styles from './player.module.css';

const Player = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.avaPlace}>
          <div className={styles.avatarka}></div>
        </div>
        <div className={styles.pagesBtnsDiv}>
          <div className={styles.btnsDiv}>
            <div className={styles.pageBtn}></div>
            <div className={styles.pageBtn}></div>
            <div className={styles.pageBtn}></div>
            <div className={styles.pageBtn}></div>
            <div className={styles.pageBtn}></div>
          </div>
        </div>
        <div className={styles.songPlaceDiv}>
          <div className={styles.songDiv}>
            <div className={styles.songName}>Not Like Us</div>
            <div className={styles.singer}>Kendrick Lamar</div>
            <div className={styles.circleSong}></div>
          </div>
        </div>
      </div>

      <div className={styles.middleRight}>
        <div className={styles.emptyDiv1}></div>

        <div className={styles.mrMiddle}>
          <div className={styles.mrLeft}></div>
          <div className={styles.mrMidd}></div>
          <div className={styles.mrRight}></div>
          <div className={styles.emptyDiv2}></div>
        </div>

        <div className={styles.mrBottom}></div>
      </div>
    </div>
  );
};

export default Player;
