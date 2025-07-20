import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import AlbumItem from "./AlbumItem";
import SongItem from "../player-page/SongItem";
import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../../hooks/useApi";
import { useAudio } from "../../hooks/useAudio";
import AddAlbumModal from "./AddAlbumModal";
import AddMusicModal from "./AddMusicModal";

const ArtistOwnMediaLibrary = () => {
  const { setCurrentSong, setCurrentSongList } = useAudio();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user, isLoading } = useAuth0();
  const { apiFetch } = useAPI();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  //   const fetchPlaylists = async () => {
  //     const response = await apiFetch(`/playlists/playlists/${user.sub}`);
  //     const body = await response.json();
  //     // setPlaylists(body);
  //     fetchCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  //   };

  const fetchArtistTracks = async () => {
    const response = await apiFetch(`/tracks/tracks-by-artists/${user.sub}`);
    const body = await response.json();
    setSongs(body);
  };
  const fetchArtistAlbums = async () => {
    const response = await apiFetch(`/albums/albums-by-artists/${user.sub}`);
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
        <div className={styles["saved-songs-container1"]}>
          <div className={styles["svyazka"]}>
            <div className={styles["saved-songs-text"]}>Your Songs</div>
            <button
              className={styles["add-btn"]}
              onClick={() => setShowModal(true)}
            >
              Add +
            </button>
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

        <div className={styles["saved-album-container1"]}>
          <div className={styles["svyazka"]}>
            <div className={styles["saved-album-text"]}>Your Albums</div>
            <button
              className={styles["add-btn"]}
              onClick={() => setShowModal1(true)}
            >
              Add +
            </button>
          </div>
          <div className={styles["album-array"]}>
            {albums.map((item, idx) => (
              <AlbumItem album={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
      {showModal && <AddMusicModal onClose={() => setShowModal(false)} />}
      {showModal1 && <AddAlbumModal onClose={() => setShowModal1(false)} />}
    </div>
  );
};

export default ArtistOwnMediaLibrary;
