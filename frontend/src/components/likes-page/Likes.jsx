import React from "react";
import LeftSide from '../main-components/LeftSide'
import { useNavigate } from "react-router-dom";

import styles from "./likes.module.css";

export default function Likes() {
      const navigate = useNavigate();
    return (
        <div>
            <div className={styles["likes-container"]}>
                <div className={styles["empty1"]}></div>

                <div className={styles["likes-platform"]}>

                    <div className={styles["likes-content"]}>

                        <div className={styles["upper"]}>

                            <div className={styles["back-search"]}>
                                <button className={styles["backbtn"]} onClick={() => navigate("/player")}></button>
                                <input type="text" className={styles["search-likes"]} placeholder="Search" />
                            </div>

                            <div className={styles["likes-playlists"]}>
                                {[...Array(14)].map((_, i) => (
                                    <button key={i} className={styles["playlist"]}>Playlist</button>
                                ))}
                            </div>



                        </div>


                        <div className={styles["middle"]}>

                            <div className={styles["likes-photo"]}> </div>
                            <div className={styles["likes-play"]}>
                                <div className={styles["likes-text"]}>Likes</div>
                                <button className={styles["play-btn"]}>Play</button>

                            </div>

                        </div>

                        <div className={styles["bottom"]}>
                            <div className={styles["bottom-wrapper"]}>
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className={styles["liked-song"]}></div>
                                ))}
                            </div>


                        </div>

                    </div>
                </div>

            </div>

            


        </div>
    );
}