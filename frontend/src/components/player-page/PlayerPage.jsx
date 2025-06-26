import React, { useState } from "react";
import styles from "./player.module.css";
import YourLibrary from "./YourLibrary";
import SongItem from "./SongItem";
import FooterPlayer from "./FooterPlayer";
import LeftSide from "../main-components/LeftSide";
import MiddleSongItem from "./MIddleSongItem";
import MiddleItem from "./MiddleItem";

const PlayerPage = () => {
  const [currentSong, setCurrentSong] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [songsLibrary, setSongsLibrary] = useState([
    {
      title: "I Fall to Pieces",
      artist: "Patsy Cline",
      source_url: "/test_music/Patsy Cline - I Fall to Pieces.mp3",
      listenersCount: 122345,
    },
    {
      title: "Bring It on Home",
      artist: "Sonny Boy Williamson",
      source_url: "/test_music/Sonny Boy Williamson - Bring It on Home.mp3",
      listenersCount: 1222345,
    },
  ]);
  const [songsMiddleItem, setSongsMiddleItem] = useState([
    {
      title: "I Fall to Pieces 1",
      artist: "Patsy Cline",
      source_url: "/test_music/Patsy Cline - I Fall to Pieces.mp3",
      listenersCount: 122345,
    },
    {
      title: "Bring It on Home 2",
      artist: "Sonny Boy Williamson",
      source_url: "/test_music/Sonny Boy Williamson - Bring It on Home.mp3",
      listenersCount: 1222345,
    },
    {
      title: "I Fall to Pieces 3",
      artist: "Patsy Cline",
      source_url: "/test_music/Patsy Cline - I Fall to Pieces.mp3",
      listenersCount: 122345,
    },
    {
      title: "Bring It on Home 4",
      artist: "Sonny Boy Williamson",
      source_url: "/test_music/Sonny Boy Williamson - Bring It on Home.mp3",
      listenersCount: 1222345,
    },
  ]);
  const [artist, setArtist] = useState({
    firstName: "Billie",
    lastName: "Eilish",
    monthlyListner: 71478075,
  });
  const nextSong = () => {
    if (currentAlbum.indexOf(currentSong) + 1 < currentAlbum.length)
      setCurrentSong(currentAlbum[currentAlbum.indexOf(currentSong) + 1]);
  };
  const prevSong = () => {
    if (currentAlbum.indexOf(currentSong) - 1 >= 0)
      setCurrentSong(currentAlbum[currentAlbum.indexOf(currentSong) - 1]);
  };
  return (
    <div className={styles.container}>
      <LeftSide />
      <div className={styles["middle-right"]}>
        <div className={styles["empty-div1"]}></div>

        <div className={styles["mr-middle"]}>
          <div className={styles["mr-left"]}>
            <YourLibrary
              songsList={songsLibrary}
              onSongSelect={setCurrentSong}
              onSetCurrentAlbum={setCurrentAlbum}
            />
          </div>
          <MiddleItem
            songsList={songsMiddleItem}
            onSongSelect={setCurrentSong}
            onSetCurrentAlbum={setCurrentAlbum}
            artist={artist}
          />

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

        </div>

        <FooterPlayer songControl={{ currentSong, nextSong, prevSong }} />
      </div>
    </div>
  );
};

export default PlayerPage;
