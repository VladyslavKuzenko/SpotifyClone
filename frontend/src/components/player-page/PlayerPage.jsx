import React, { useEffect, useState } from "react";
import styles from "./player.module.css";
import YourLibrary from "./YourLibrary";
import SongItem from "./SongItem";
import FooterPlayer from "./FooterPlayer";
import LeftSide from "../main-components/LeftSide";
import MiddleSongItem from "./MIddleSongItem";
import MiddleItem from "./MiddleItem";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";
import { Navigate } from "react-router-dom";

const PlayerPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [currentSong, setCurrentSong] = useState("");
  const [currentAlbum, setCurrentAlbum] = useState("");
  const [songsLibrary, setSongsLibrary] = useState([]);
  const [test, setTest] = useState();
  /* const [songsLibrary, setSongsLibrary] = useState([
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
  ]); */
  /*  const [songsMiddleItem, setSongsMiddleItem] = useState([
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
  ]); */
  const [songsMiddleItem, setSongsMiddleItem] = useState([]);
  const [currentArtist, setCurrentArtist] = useState({});
  const [artists, setArtists] = useState();

  const handleArtist = async () => {
    if (isAuthenticated) {
      console.log("handleArtist is working");

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch("http://localhost:8080/artists/top/0/20", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setArtists(body);
      setCurrentArtist(body[0]);
      /*  console.log("BODY:")
      console.log(body)
      console.log("First Name: "+ body[0].user.firstName);
      console.log(body[0].user.firstName);
      console.log(body[0].listeningCount); */
      //console.log(body[0].user.firstName);
    } else {
      console.log("handleArtist is NOT working");
    }
  };
  const handleArtistMusic = async () => {
    if (isAuthenticated) {
      console.log("handleArtistMusic is working");
      console.log("Current Artist Id");
      console.log(currentArtist.id);

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch(
        `http://localhost:8080/tracks/tracks-by-artists/${currentArtist.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const body = await response.json();
      setSongsMiddleItem(body);
      console.log("BODY Track:");
      console.log(body);
      /*  console.log("First Name: "+ body[0].user.firstName);
      console.log(body[0].user.firstName);
      console.log(body[0].listeningCount); */
      //console.log(body[0].user.firstName);
    } else {
      console.log("handleArtist is NOT working");
    }
  };
  const handleStart = async () => {
    if (isAuthenticated) {
      console.log("handleArtist is working");

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

      const bodyArtist = await responseArtist.json();
      setArtists(bodyArtist);
      setCurrentArtist(bodyArtist[0]);

      const responseTrack = await fetch(
        `http://localhost:8080/tracks/tracks-by-artists/${bodyArtist[0].id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bodyTrack = await responseTrack.json();
      setSongsMiddleItem(bodyTrack);
      setTest(true);
    }
  };
  useEffect(() => {
    handleStart();
  }, [isLoading]);
  /* useEffect(() => {
    console.log("useEffect isLoading is  working");
    handleArtist();
  },[isLoading]);
    useEffect(() => {
    console.log("useEffect currentArtist is  working");
    handleArtistMusic();
  },[currentArtist]); */

  const nextSong = () => {
    if (currentAlbum.indexOf(currentSong) + 1 < currentAlbum.length)
      setCurrentSong(currentAlbum[currentAlbum.indexOf(currentSong) + 1]);
  };
  const prevSong = () => {
    if (currentAlbum.indexOf(currentSong) - 1 >= 0)
      setCurrentSong(currentAlbum[currentAlbum.indexOf(currentSong) - 1]);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
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
              artist={{
                ...currentArtist.user,
                monthlyListner: currentArtist.listeningCount,
              }}
            />
            
          </div>

          <FooterPlayer songControl={{ currentSong, nextSong, prevSong }} />
        </div>
      </div>
    </>
  );
};

export default PlayerPage;
