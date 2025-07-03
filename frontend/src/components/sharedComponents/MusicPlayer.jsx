// PlayerComponent.jsx
import React, { useEffect } from "react";
import stylesFooter from "../player-page/player.module.css"; // заміни на свій шлях до CSS
import AudioControl from "./AudioControl";

//const FooterPlayer = ({ currentSong,nextSong,prevSong }) => {
const MusicPlayer = ({ songControl, footerPlayer }) => {
  return (
    <>
      {footerPlayer ? (
        <div className={stylesFooter ["footer-container"]}>
          <div className={stylesFooter["mr-bottom"]}>
            <div className={stylesFooter["mrb-left"]}>
              <div className={stylesFooter["bmr-cover"]}></div>
              <div className={stylesFooter["bmr-song-info"]}>
                <div className={stylesFooter["bmr-title"]}>
                  {songControl.currentSong.title}
                </div>
                <div className={stylesFooter["bmr-artist"]}>
                  {songControl.currentSong?.artist?.user?.username}
                </div>
              </div>
            </div>

            <AudioControl
              songControl={{
                currentSong: songControl.currentSong,
                nextSong: songControl.nextSong,
                prevSong: songControl.prevSong,
              }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MusicPlayer;
