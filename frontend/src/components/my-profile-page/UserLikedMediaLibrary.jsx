import React, { useEffect, useState } from "react";
import styles from './MyProfile.module.css'
import AlbumItem from "./AlbumItem";
import SongItem from "../player-page/SongItem";
import PostItem from "../main-page/PostItem";
import { useAudio } from "../../hooks/useAudio";

const UserLikedMediaLibrary= () => {
    const { setCurrentSong, setCurrentSongList } = useAudio();
    const [songs, setSongs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    return (
        <div>
            <div className={styles['functional-container1']}>



                <div className={styles['saved-album-container']}>
                    <div className={styles['svyazka']}>
                        <div className={styles['saved-album-text']}>Saved Albums</div>
                    </div>
                    <div className={styles['album-array']}>
                        {Array(11).fill(0).map((_, idx) => (
                            <AlbumItem key={idx} />
                        ))}
                    </div>
                </div>
                <div className={styles["saved-songs-container"]}>
                    <div className={styles['svyazka']}>
                        <div className={styles["saved-songs-text"]}>Saved Songs</div>
                    </div>
                    <div className={styles["song-array"]}>
                        {songs.map((song, index) => (
                            <SongItem
                                key={song.id}
                                song={song}
                                moreInfo
                                onSetCurrentSongList={() => setCurrentSongList(songs)}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles["bottom-place"]}>
                    <div className={styles["posts-place"]}>
                        <div className={styles["posts-text"]}>Posts</div>
                        <PostItem selectedTab="user" />
                        <div className={styles["posts-array"]}></div>
                    </div>
                    <div className={styles["groups-place"]}>
                        <div className={styles["groups-text"]}>Groups</div>
                        <div className={styles["groups-container"]}>
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className={styles["grp-hiphop-heads"]}>
                                    <div className={styles["grp-avatar"]}></div>
                                    <div className={styles["grp-info"]}>
                                        <div className={styles["grp-name"]}>Hip-Hop Heads</div>
                                        <div className={styles["grp-followers"]}>35477 followers</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLikedMediaLibrary;
