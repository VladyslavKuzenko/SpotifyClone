import React from "react";
import styles from "./MyProfile.module.css";
import playerStyles from "../player-page/player.module.css"

const WatchAlbum = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className={styles["wam-overlay"]} onClick={onClose} />
            <div className={styles["wam-modal"]}>
                <div className={playerStyles["foot-left"]}>
                    <img
                        className={playerStyles["foot-photo"]}
                        src={""}
                    />
                    <div className={playerStyles["foot-bcontent"]}>
                        <div className={styles["wam-svyazka"]}>

                            <div className={styles["wam-songartist"]}>
                                <div className={playerStyles["foot-song"]}>
                                    {""}Song name
                                </div>
                                <div className={playerStyles["foot-artist"]}>
                                    {""}song artist
                                </div>
                            </div>
                            <div className={styles["wam-btnplace"]}>
                                <button className={styles["wam-play"]}></button>
                            </div>
                        </div>

                        <div className={playerStyles["foot-likeslisteners"]}>
                            <div className={playerStyles["foot-likes"]}>
                                {""} 52 listenings
                            </div>
                        </div>
                    </div>
                </div>

                <div className={playerStyles["foot-right"]}>
                    <div className={playerStyles["tab-content"]}>
                        <button className={playerStyles["up-next-btn"]}>Up next</button>
                    </div>

                    <div className={playerStyles["foot-array"]}>
                        {/* {currentSongList.map((i) => (
              <SongItem
                key={i.id}
                song={i}
                onSetCurrentSongList={() => {
                  setIsRandomList(false);
                  setCurrentSongList(currentSongList);
                }}
                moreInfo
              />
            ))} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WatchAlbum;
