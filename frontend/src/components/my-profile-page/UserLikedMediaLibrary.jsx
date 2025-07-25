// import React, { useEffect, useState } from "react";
// import styles from "./MyProfile.module.css";
// import AlbumItem from "./AlbumItem";
// import SongItem from "../player-page/SongItem";
// import { useAudio } from "../../hooks/useAudio";
// import { useAPI } from "../../hooks/useApi";
// import { useAuth0 } from "@auth0/auth0-react";
// import WatchAlbum from "./WatchAlbum";
// import { handleSaveAlbum, isAlbumSaved } from "../../js/functions/functions";
// import { useUserInfo } from "../../hooks/useUserInfo";

// const UserLikedMediaLibrary = ({ userToShowProfile }) => {
//   const { setCurrentSongList, setIsRandomList } = useAudio();
//   const [userSongs, setUserSongs] = useState([]);
//   const [userAlbums, setUserAlbums] = useState([]);
//   // const { isLoading } = useAuth0();
//   const { apiFetch, user } = useAPI();
//   const { songs,albums } = useUserInfo();
//   const [showWatchAlbum, setShowWatchAlbum] = useState(false);
//   const [selectedAlbum, setSelectedAlbum] = useState(null);

//   const fetchPlaylists = async () => {
//     if (userToShowProfile.id !== user.sub) {
//       const response = await apiFetch(
//         `/playlists/playlists/${userToShowProfile.id}`
//       );
//       const body = await response.json();
//       fetchCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
//     } else {
//       setUserSongs(songs);
//     }
//   };

//   const fetchCurrentPlaylistTracks = async (currentPlaylist) => {
//     if (!currentPlaylist) return;
//     const response = await apiFetch(
//       `/tracks/tracks-by-postTime/${currentPlaylist.id}`
//     );
//     const body = await response.json();
//     setUserSongs(body);
//     console.log("UserLikedMediaLibrary: ", body);
//   };

//   const fetchArtistAlbums = async () => {
//     if (userToShowProfile.id !== user.sub) {

//     const response = await apiFetch(
//       `/users/userSavedAlbums/${userToShowProfile.id}`
//     );
//     const body = await response.json();

//     const newData = await Promise.all(
//       body.map(async (item) => {
//         const isSaved = await isAlbumSaved(item, user, apiFetch);
//         return { ...item, isSaved };
//       })
//     );
//     setUserAlbums(newData);
//   }else{
//     setUserAlbums(albums);

//   }
//   };

//   useEffect(() => {
//     if (!userToShowProfile) return;
//     fetchPlaylists();
//     fetchArtistAlbums();
//   }, [userToShowProfile]);

//   return (
//     <div>
//       <div className={styles["functional-container1"]}>
//         {/* Saved Albums */}
//         <div className={styles["saved-album-container"]}>
//           <div className={styles["svyazka"]}>
//             <div className={styles["saved-album-text"]}>Saved Albums</div>
//           </div>
//           {/* <div className={styles["album-array"]}>
//             {albums.length > 0 ? (
//               albums.map((item, idx) => (
//                 <AlbumItem album={item} key={idx} />
//               ))
//             ) : (
//               <div className={styles["empty-message"]}>
//                 <h2>No albums saved yet</h2>
//                 <h3>Start exploring and save your favorites!</h3>
//               </div>
//             )}
//           </div> */}
//           <div className={styles["album-array"]}>
//             {userAlbums?.length === 0 ? (
//               <div className={styles["empty-message"]}>
//                 <h2>There are no albums here yet</h2>
//                 <h3>+ Add your first album</h3>
//               </div>
//             ) : (
//               userAlbums?.map((item, idx) => (
//                 <AlbumItem
//                   album={item}
//                   key={idx}
//                   onClickFunck={() => {
//                     setSelectedAlbum(item);
//                     setShowWatchAlbum(true);
//                   }}
//                   handleSaveAlbum={() => {
//                     handleSaveAlbum(item, user, apiFetch);
//                   }}
//                 />
//               ))
//             )}
//           </div>
//         </div>

//         {/* Saved Songs */}
//         <div className={styles["saved-songs-container"]}>
//           <div className={styles["svyazka"]}>
//             <div className={styles["saved-songs-text"]}>Saved Songs</div>
//           </div>
//           <div className={styles["song-array"]}>
//             {/* {console.log("Songs: ", songs)} */}
//             {userSongs.length > 0 ? (
//               userSongs.map((song) => (
//                 <SongItem
//                   key={song.id}
//                   song={song}
//                   moreInfo
//                   onSetCurrentSongList={() => {
//                     setIsRandomList(false);
//                     setCurrentSongList(userSongs);
//                   }}
//                 />
//               ))
//             ) : (
//               <div className={styles["empty-message"]}>
//                 <h2>It's empty here</h2>
//                 <h3>+ Add your favorite tracks to see them here.</h3>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <WatchAlbum
//         isOpen={showWatchAlbum}
//         onClose={() => setShowWatchAlbum(false)}
//         album={selectedAlbum}
//       ></WatchAlbum>
//     </div>
//   );
// };

// export default UserLikedMediaLibrary;


import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import AlbumItem from "./AlbumItem";
import SongItem from "../player-page/SongItem";
import { useAudio } from "../../hooks/useAudio";
import { useAPI } from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";
import WatchAlbum from "./WatchAlbum";
import { handleSaveAlbum, isAlbumSaved } from "../../js/functions/functions";

const UserLikedMediaLibrary = ({ userToShowProfile }) => {
  const { setCurrentSongList, setIsRandomList } = useAudio();
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { isLoading } = useAuth0();
  const { apiFetch, user } = useAPI();

  const [showWatchAlbum, setShowWatchAlbum] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const fetchPlaylists = async () => {
    const response = await apiFetch(
      `/playlists/playlists/${userToShowProfile.id}`
    );
    const body = await response.json();
    fetchCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
  };

  const fetchArtistAlbums = async () => {
    const response = await apiFetch(
      `/users/userSavedAlbums/${userToShowProfile.id}`
    );
    const body = await response.json();

    const newData = await Promise.all(
      body.map(async (item) => {
        const isSaved = await isAlbumSaved(item, user, apiFetch);
        return { ...item, isSaved };
      })
    );
    setAlbums(newData);
  };

  const fetchCurrentPlaylistTracks = async (currentPlaylist) => {
    if (!currentPlaylist) return;
    const response = await apiFetch(
      `/tracks/tracks-by-postTime/${currentPlaylist.id}`
    );
    const body = await response.json();
    setSongs(body);
    console.log("UserLikedMediaLibrary: ", body);
  };

  useEffect(() => {
    if (!userToShowProfile) return;
    fetchPlaylists();
    fetchArtistAlbums();
  }, [userToShowProfile]);

  return (
    <div>
      <div className={styles["functional-container1"]}>
        {/* Saved Albums */}
        <div className={styles["saved-album-container"]}>
          <div className={styles["svyazka"]}>
            <div className={styles["saved-album-text"]}>Saved Albums</div>
          </div>
          {/* <div className={styles["album-array"]}>
            {albums.length > 0 ? (
              albums.map((item, idx) => (
                <AlbumItem album={item} key={idx} />
              ))
            ) : (
              <div className={styles["empty-message"]}>
                <h2>No albums saved yet</h2>
                <h3>Start exploring and save your favorites!</h3>
              </div>
            )}
          </div> */}
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
                  handleSaveAlbum={() => {
                    handleSaveAlbum(item, user, apiFetch);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Saved Songs */}
        <div className={styles["saved-songs-container"]}>
          <div className={styles["svyazka"]}>
            <div className={styles["saved-songs-text"]}>Saved Songs</div>
          </div>
          <div className={styles["song-array"]}>
            {console.log("Songs: ", songs)}
            {songs.length > 0 ? (
              songs.map((song) => (
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
            ) : (
              <div className={styles["empty-message"]}>
                <h2>It's empty here</h2>
                <h3>+ Add your favorite tracks to see them here.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      <WatchAlbum
        isOpen={showWatchAlbum}
        onClose={() => setShowWatchAlbum(false)}
        album={selectedAlbum}
      ></WatchAlbum>
    </div>
  );
};

export default UserLikedMediaLibrary;
