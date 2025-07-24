import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import AlbumItem from "./AlbumItem";
import SongItem from "../player-page/SongItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";
import AddAlbumModal from "./AddAlbumModal";
import AddMusicModal from "./AddMusicModal";
import WatchAlbum from "./WatchAlbum"; 

const ArtistOwnMediaLibrary = ({ user, isAddButtonsAvaliable }) => {
  const { setCurrentSong, setCurrentSongList, setIsRandomList } = useAudio();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { isLoading } = useAuth0();
  const { apiFetch } = useAPI();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showWatchAlbum, setShowWatchAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const fetchArtistTracks = async () => {
    const response = await apiFetch(`/tracks/tracks-by-artists/${user.id}`);
    const body = await response.json();
    setSongs(body);
  };

  const fetchArtistAlbums = async () => {
    const response = await apiFetch(`/albums/albums-by-artists/${user.id}`);
    const body = await response.json();
    setAlbums(body);
  };

  useEffect(() => {
    if (isLoading) return;
    fetchArtistAlbums();
    fetchArtistTracks();
  }, [isLoading]);

  return (
    <div>
      <div className={styles["functional-container1"]}>
        {/* Songs */}
        <div className={styles["saved-songs-container1"]}>
          <div className={styles["svyazka"]}>
            {isAddButtonsAvaliable ? (
              <>
                <div className={styles["saved-songs-text"]}>Your Songs</div>
                <button
                  className={styles["add-btn"]}
                  onClick={() => setShowModal(true)}
                >
                  Add +
                </button>
              </>
            ) : (
              <div className={styles["saved-songs-text"]}>Artist's Music</div>
            )}
          </div>
          <div className={styles["song-array"]}>
            {songs.length === 0 ? (
              <div className={styles["empty-message"]}>
                <h2>There are no songs here yet</h2>
                <h3>+ Add your first song</h3>
              </div>
            ) : (
              songs.map((song, index) => (
                <SongItem
                  key={song.id}
                  song={song}
                  moreInfo
                  onSetCurrentSongList={() => {
                    setIsRandomList(false);
                    setCurrentSongList(songs);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Albums */}
        <div className={styles["saved-album-container1"]}>
          <div className={styles["svyazka"]}>
            {isAddButtonsAvaliable ? (
              <>
                <div className={styles["saved-album-text"]}>Your Albums</div>
                <button
                  className={styles["add-btn"]}
                  onClick={() => setShowModal1(true)}
                >
                  Add +
                </button>
              </>
            ) : (
              <div className={styles["saved-album-text"]}>Artist's Albums</div>
            )}
          </div>
            <div className={styles["album-array"]}>
        {albums.length === 0 ? (
          <div className={styles["empty-message"]}>
            <h2>There are no albums here yet</h2>
            <h3>+ Add your first album</h3>
          </div>
        ) : (
          albums.map((item, idx) => (
            <AlbumItem
              album={item}
              key={idx}
              onClickFunck={() => {
                setSelectedAlbum(item);
                setShowWatchAlbum(true);
              }}
            />
          ))
        )}
      </div>
        </div>
      </div>

      {/* Modals */}
      
      {showModal && <AddMusicModal onClose={() => setShowModal(false)} />}
      {showModal1 && <AddAlbumModal onClose={() => setShowModal1(false)} />}
        <WatchAlbum
        isOpen={showWatchAlbum}
        onClose={() => setShowWatchAlbum(false)}
      >
      </WatchAlbum>
    </div>
  );
};

export default ArtistOwnMediaLibrary;
