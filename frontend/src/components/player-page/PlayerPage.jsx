import React, { useState } from "react";
import styles from "./player.module.css";
import YourLibrary from "./YourLibrary";
import SongItem from "./SongItem";
import FooterPlayer from "./FooterPlayer";
import LeftSide from "../main-components/LeftSide";
import MiddleSongItem from "./MIddleSongItem";

const PlayerPage = () => {
  const [currentSong, setCurrentSong] = useState("");
  const [songsLibrary, setSongsLibrary] = useState([
    {
      title: "I Fall to Pieces",
      artist: "Patsy Cline",
      source_url: "/test_music/Patsy Cline - I Fall to Pieces.mp3",
    },
    {
      title: "Bring It on Home",
      artist: "Sonny Boy Williamson",
      source_url: "/test_music/Sonny Boy Williamson - Bring It on Home.mp3",
    },
  ]);
  const [songsRecomended, setSongsRecomended] = useState([
    {
      title: "I Fall to Pieces",
      artist: "Patsy Cline",
      source_url: "/test_music/Patsy Cline - I Fall to Pieces.mp3",
    },
    {
      title: "Bring It on Home",
      artist: "Sonny Boy Williamson",
      source_url: "/test_music/Sonny Boy Williamson - Bring It on Home.mp3",
    },
  ]);
  const nextSong = () => {
    if (songsLibrary.indexOf(currentSong) + 1 < songsLibrary.length)
      setCurrentSong(songsLibrary[songsLibrary.indexOf(currentSong) + 1]);
  };
  const prevSong = () => {
    if (songsLibrary.indexOf(currentSong) - 1 >= 0)
      setCurrentSong(songsLibrary[songsLibrary.indexOf(currentSong) - 1]);
  };
  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles["middle-right"]}>
        <div className={styles["empty-div1"]}></div>

        <div className={styles["mr-middle"]}>
          <div className={styles["mr-left"]}>
            <YourLibrary songsLibrary={songsLibrary} onSongSelect={setCurrentSong} />
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
                    <button className={styles["pf-play"]}>Play</button>
                    <button className={styles["pf-follow"]}>Follow</button>
                  </div>
                </div>
              </div>

              <div className={styles["recommended-text"]}>Recommended</div>

              <div className={styles["as-plat3"]}>
                {[...Array(9)].map((_, i) => (
                  <MiddleSongItem onSongSelect={setCurrentSong} />
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

        <FooterPlayer
          currentSong={currentSong}
          nextSong={nextSong}
          prevSong={prevSong}
        />
      </div>
    </div>
  );
};

export default PlayerPage;
