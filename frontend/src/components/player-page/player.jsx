import React from "react";
import styles from "./player.module.css";

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
            <div className={styles["your-library"]}>
              <div className={styles["yl-empty1"]}></div>

              <div className={styles["yl-main"]}>
                <div className={styles["yl-text-plus"]}>
                  <div className={styles["yl-text"]}>Your library</div>
                  <div className={styles["yl-plus-plat"]}>
                    <div className={styles["yl-plus"]}>+</div>
                  </div>
                </div>

                <div className={styles["playlist-platform"]}>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={styles["playlist-element"]}>
                      playlist
                    </div>
                  ))}
                </div>

                <div className={styles["search-recent"]}>
                  <div className={styles["sr-search"]}>Search</div>
                  <div className={styles["sr-recent"]}>Recent</div>
                </div>

                <div className={styles["yl-song-container"]}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={styles["song-item"]}>
                      <div className={styles.cover}></div>
                      <div className={styles.info}>
                        <div className={styles.title}>Song title</div>
                        <div className={styles.artist}>Artist</div>
                      </div>
                      <div className={styles.duration}>2:56</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

        <div className={styles["mr-bottom"]}>
          <div className={styles["mb-empty1"]}></div>

          <div className={styles["mrb-left"]}>
            <div className={styles["bmr-cover"]}></div>
            <div className={styles["bmr-song-info"]}>
              <div className={styles["bmr-title"]}>Song title</div>
              <div className={styles["bmr-artist"]}>Artist</div>
            </div>
          </div>

          <div className={styles["mrb-center"]}>
            <div className={styles["bmr-controls"]}>
              <div className={styles["bmr-btn"]}>⏺</div>
              <div className={styles["bmr-btn"]}>⏮</div>
              <div className={styles["bmr-btn"]}>▶</div>
              <div className={styles["bmr-btn"]}>⏭</div>
              <div className={styles["bmr-btn"]}>⏺</div>
            </div>
            <div className={styles["bmr-progress"]}>
              <div className={styles["current-time-start"]}>0:57</div>
              <div className={styles["bmr-bar-wrapper"]}>
                <div
                  className={styles["bmr-bar-fill"]}
                  style={{ width: "50%" }}
                ></div>
              </div>
              <div className={styles["current-time-end"]}>4:32</div>
            </div>
          </div>

          <div className={styles["mrb-right"]}>
            <div className={styles["bmr-volume-wrapper"]}>
              <div
                className={styles["bmr-volume-fill"]}
                style={{ width: "70%" }}
              ></div>
            </div>
            <div className={styles["bmr-plus"]}>+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
