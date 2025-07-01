import React from 'react';
import styles from './rating.module.css';
import LeftSide from '../main-components/LeftSide';
export default function Rating() {
  return (
    <>
      <LeftSide/>
      <div className={styles["raitinig-container"]}>
        <div className={styles["upper-platform"]}>
          <div className={styles["upper-left"]}>
            <div className={styles["top-content"]}>
              <div className={styles["text1"]}>Popular Tracks</div>
              <div className={styles["btn-container"]}>
                <button className={styles["all-type"]}>All Type </button>
                <button className={styles["period"]}>Monthly</button>
                <button className={styles["world-place"]}>Worldwide</button>
              </div>
            </div>

            <div className={styles["info-song"]}>
              <div className={styles["info-place"]}>1</div>
              <div className={styles["info-content"]}>
                <div className={styles["info-artist"]}>Travis Skott</div>
                <div className={styles["info-song-name"]}>Type Sh-t</div>
                <div className={styles["info-listeners"]}>19.7m listeners</div>
              </div>
            </div>
          </div>

          <div className={styles["upper-right"]}>
            <div className={styles["scroll-container"]}>
              {[...Array(10)].map((_, i) => (
                <div key={i} className={styles["scroll-item"]}>
                  <div className={styles["item-place"]}>1</div>
                  <div className={styles["item-info"]}>
                    <div className={styles["item-photo"]}></div>
                    <div className={styles["inside-info"]}>
                      <div className={styles["inside-name"]}>Not Like Us</div>
                      <div className={styles["inside-singer"]}>Kendrick Lamar</div>
                      <div className={styles["inside-listeners"]}>19.7m listeners</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles["bottom-platform"]}>
          <div className={styles["text2"]}>Top Artists</div>

          <div className={styles["bottom-content"]}>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item1"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Kendrick Lamar</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>15.7m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item2"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Travis Skott</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>15.7m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item3"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>The Weekend</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>12m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item4"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Billie Eilish</div>
                </div>
                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>10.9m listeners</div>
            </div>

            <div className={styles["raite-wrapper"]}>
              <div className={styles["raite-item5"]}>
                <div className={styles["raite-photo"]}></div>
                <div className={styles["raite-center"]}>
                  <div className={styles["raite-text"]}>Bad Bunny</div>
                </div>

                <div className={styles["raite-end"]}></div>
              </div>
              <div className={styles["raite-listeners"]}>7.7m listeners</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
