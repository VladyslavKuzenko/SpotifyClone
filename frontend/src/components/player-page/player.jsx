import React from "react";
import styles from "./player.module.css";
import YourLibraryComponent from './your-library-component';
import SongItem from './song-item';
import PlayerComponent from './player-component';


const Player = () => {
  return (

    <div className={styles.container}>
      <div className={styles["left-side"]}>
        <div className={styles["ava-place"]}>
          <div className={styles.avatarka}></div>
        </div>
        <div className={styles["pages-btns-div"]}>
          <div className={styles["btns-div"]}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles["page-btn"]}></div>
            ))}
          </div>
        </div>

        <div className={styles["song-place-div"]}>
          <div className={styles["song-div"]}>
            <div className={styles["song-name"]}>Not Like Us</div>
            <div className={styles.singer}>Kendrick Lamar</div>
            <div className={styles["circle-song"]}></div>
          </div>
        </div>
      </div>

      <div className={styles["middle-right"]}>
        <div className={styles["empty-div1"]}></div>

        <div className={styles["mr-middle"]}>
          <div className={styles["mr-left"]}>
            <YourLibraryComponent />
          </div>

          <div className={styles["mr-midd"]}>
            <div className={styles["artist-songs"]}>
              <div className={styles["as-plat1"]}>
                <div className={styles["left-right-btns"]}>
                  <div className={styles["left-btn-plat"]}></div>
                  <div className={styles["right-btn-plat"]}></div>
                </div>
                <div className={styles["as-search-plat"]}>
                  <div className={styles["as-search"]}>Search</div>
                </div>
              </div>

              <div className={styles["as-plat2"]}>
                <div className={styles["as-empty1"]}></div>
                <div className={styles["artist-listeners"]}>
                  <div className={styles["al-artist"]}>Artist</div>
                  <div className={styles["al-listeners"]}>
                    1 689 76 monthly listeners
                  </div>
                </div>
                <div className={styles["play-follow"]}>
                  <div className={styles["pf-empty1"]}></div>
                  <div className={styles["pf-container"]}>
                    <div className={styles["pf-play"]}>Play</div>
                    <div className={styles["pf-follow"]}>Follow</div>
                  </div>
                </div>
              </div>

              <div className={styles["recommended-text"]}>Recommended</div>

              <div className={styles["as-plat3"]}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={styles["as-song-item"]}>
                    <div className={styles["as-song-photo"]}></div>
                    <div className={styles["as-name-artist"]}>
                      <div className={styles["as-song-name-it"]}>Song tittle</div>
                      <div className={styles["as-song-artist-it"]}>Artist</div>
                    </div>
                    <div className={styles["as-listeners-count"]}>
                      102 664 992
                    </div>
                    <div className={styles["as-plus"]}>+</div>
                    <div className={styles["as-duration"]}>13:58</div>
                    <div className={styles["as-more-menu"]}>
                      <div className={styles["as-menu-plat"]}>
                        <div className={styles["as-mp-circle"]}></div>
                        <div className={styles["as-mp-circle"]}></div>
                        <div className={styles["as-mp-circle"]}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles["mr-right"]}>
            <div className={styles["artists-mix"]}>
              <div className={styles["am-text"]}>Artist`s mix</div>
              <div className={styles["am-info-plat"]}>
                <div className={styles["am-photo-plat"]}>
                  <div className={styles["am-photo"]}></div>
                </div>
                <div className={styles["am-song-info"]}>
                  <div className={styles["am-song-texts"]}>
                    <div className={styles["am-song-title"]}>Song title</div>
                    <div className={styles["am-song-artist"]}>Artist</div>
                  </div>
                  <div className={styles["am-icons"]}>
                    <div className={styles["am-plus"]}>+</div>
                    <div className={styles["am-menu"]}>⋯</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles["empty-div2"]}></div>
        </div>

        <PlayerComponent/>
      </div>
    </div>
  );
};

export default Player;
