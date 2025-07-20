import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import AlbumItem from "./AlbumItem";
import SongItem from "../player-page/SongItem";
import { useAudio } from "../../hooks/useAudio";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";

const UserLikedMediaLibrary = () => {
  const { setCurrentSong, setCurrentSongList } = useAudio();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user, isLoading } = useAuth0();
  const { apiFetch } = useAPI();
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const fetchPlaylists = async () => {
    const response = await apiFetch(`/playlists/playlists/${user.sub}`);
    const body = await response.json();
    // setPlaylists(body);
    fetchCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  };
  const fetchArtistAlbums = async () => {
    const response = await apiFetch(`/albums/albums-by-artists/${user.sub}`);
    const body = await response.json();
    setAlbums(body);
  };
  const fetchCurrentPlaylistTracks = async (currentPlaylist) => {
    const response = await apiFetch(
      `/tracks/tracks-by-postTime/${currentPlaylist.id}`
    );
    const body = await response.json();
    setSongs(body);
  };

  useEffect(() => {
    if (isLoading) return;

    fetchPlaylists();
    fetchArtistAlbums();
  }, [isLoading]);

  return (
    <div>
      <div className={styles["functional-container1"]}>
        <div className={styles["saved-album-container"]}>
          <div className={styles["svyazka"]}>
            <div className={styles["saved-album-text"]}>Saved Albums</div>
          </div>
          <div className={styles["album-array"]}>
            {albums.map((item, idx) => (
              <AlbumItem album={item} key={idx} />
            ))}
          </div>
        </div>
        <div className={styles["saved-songs-container"]}>
          <div className={styles["svyazka"]}>
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
      </div>
    </div>
  );
};

export default UserLikedMediaLibrary;
