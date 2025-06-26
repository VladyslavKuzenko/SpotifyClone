import React from 'react';
import styles from './page.module.css';
import LeftSide from '../main-components/LeftSide'
import YourLibrary from '../player-page/YourLibrary'
import MiddleSongItem from '../player-page/MIddleSongItem'

const Page = () => {
  return (
    <div className={styles.container}>
      <LeftSide />

      <div className={styles['right-side']}>
        <div className={styles['empty-div1']}></div>

        <div className={styles.platform}>
          <div className={styles['plat-left']}>
            <YourLibrary />

          </div>
          <div className={styles['plat-right']}>
            <div className={styles.upper}>
              <div className={styles.upperSearch}>
                <input type="text" className={styles.upSearch} />
              </div>
              <div className={styles.upperTools}>
                <div className={styles.Recommended}> Recommended for you          </div>
                <div className={styles.Artist}> Artist               </div>


              </div>

            </div>
            <div className={styles.middle}></div>
            <div className={styles['bottom-songs']}>
              <div className={styles["as-plat3"]}>
                {[...Array(9)].map((_, i) => (
                  <MiddleSongItem />
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className={styles.footer}></div>
      </div>
    </div>
  );
};

export default Page;
