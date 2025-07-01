import { use, useEffect, useState } from "react";
import { searchSongs } from "../../js/functions/functions";
import MiddleSongItem from "./MIddleSongItem";
import styles from "./player.module.css";
import SongItem from "./SongItem";
import { API_URL } from "../../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export default function MiddleItem({
  /*   songsList, */
  onSongSelect,
  onSetCurrentSongList,
  isPlaylistsChangesControl
 /*  artist, */
/*   artistControl, */
}) {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [songsFullList, setSongsFullList] = useState([]);
  const [artists, setArtists] = useState();
  const [currentArtist, setCurrentArtist] = useState(null);
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
 
  const handleArtistMusic = async () => {
    if (isAuthenticated&& currentArtist) {
  /*     console.log("handleArtistMusic is working");
      console.log("ARTIST"); */

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch(
        `http://localhost:8080/tracks/tracks-by-artists/${currentArtist?.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json();
      setSongs(body);
      setSongsFullList(body);
 /*      console.log("BODY Track:");
      console.log(body);
 */
      /*  console.log("First Name: "+ body[0].user.firstName);
        console.log(body[0].user.firstName);
        console.log(body[0].listeningCount); */
      //console.log(body[0].user.firstName);
    }
  };
    const handleStart = async () => {
      if (isAuthenticated) {
    /*     console.log("handleArtist is working"); */
  
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: API_URL,
          },
        });
        const responseArtist = await fetch(
          "http://localhost:8080/artists/top/0/20",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
              const bodyArtists = await responseArtist.json();
        setArtists(bodyArtists);
        setCurrentArtist(bodyArtists[0]);
   /*      console.log("BODY ARTISTS:");
        console.log(bodyArtists);
        console.log("BODY ARTISTS 0:");
        console.log(bodyArtists[0]); */
        
       /*  console.log("BODY ARTISTS:");
        console.log(bodyArtists);
        const responseTrack = await fetch(
          `http://localhost:8080/tracks/tracks-by-artists/${bodyArtists[0].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const bodyTrack = await responseTrack.json();
        setSongs(bodyTrack);
        setSongsFullList(bodyTrack);
        /*  setTest(true); */ 
      }
    };
  useEffect(() => {
    const fetchData = async () => {
      await handleStart();
    };
    fetchData();
    /*  setSongs(songsList); */
    /*    console.log("MiddleItem");
    console.log(songsList);
    console.log(songs); */
  }, [isLoading]);
  useEffect(() => {
    const fetchData = async () => {
      await handleArtistMusic();
    };
    fetchData();

  }, [currentArtist]);

  const nextArtist = () => {
    if (artists.indexOf(currentArtist) + 1 < artists.length)
      setCurrentArtist(artists[artists.indexOf(currentArtist) + 1]);
  };
  const prevArtist = () => {
    if (artists.indexOf(currentArtist) - 1 >= 0)
      setCurrentArtist(artists[artists.indexOf(currentArtist) - 1]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles["mr-midd"]}>
      <div className={styles["artist-songs"]}>
        <div className={styles["as-plat1"]}>
          <div className={styles["left-right-btns"]}>
            <button
              className={styles["left-btn-plat"]}
              onClick={prevArtist}
            >
              {"<"}
            </button>
            <button
              className={styles["right-btn-plat"]}
              onClick={nextArtist}
            >
              {">"}
            </button>
          </div>
          <div className={styles["as-search-plat"]}>
            <input
              className={styles["as-search"]}
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
                searchSongs(songsFullList, e.target.value, setSongs);
              }}
              value={search}
            />
          </div>
        </div>

        <div className={styles["as-plat2"]}>
          <div className={styles["as-empty1"]}></div>
          <div className={styles["artist-listeners"]}>
            <div className={styles["al-artist"]}>
              {currentArtist?.user.firstName} {currentArtist?.user.lastName}
            </div>
            <div className={styles["al-listeners"]}>
              {currentArtist?.listeningCount} monthly listeners
            </div>
          </div>
          <div className={styles["play-follow"]}>
            <div className={styles["pf-empty1"]}></div>
            <div className={styles["pf-container"]}>
              <button
                className={styles["pf-play"]}
                onClick={() => {
                  onSongSelect(songs[0]);
                  onSetCurrentSongList(songs);
                }}
              >
                Play
              </button>
              <button className={styles["pf-follow"]}>Follow</button>
            </div>
          </div>
        </div>

        <div className={styles["recommended-text"]}>Recommended</div>

        <div className={styles["as-plat3"]}>
          {songs.map((i) => (
            <SongItem
              onSongSelect={onSongSelect}
              song={i}
              moreInfo
              onSetCurrentSongList={() => {
                onSetCurrentSongList(songs);
              }}
              isPlaylistsChangesControl={isPlaylistsChangesControl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
