import React, { useEffect, useState } from "react";
import styles from "./player.module.css";
import YourLibrary from "./YourLibrary";
import MusicPlayer from "../sharedComponents/MusicPlayer";
import LeftSide from "../main-components/LeftSide";
import MiddleItem from "./MiddleItem";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";
import { Navigate } from "react-router-dom";
import { useAPI } from "../../hooks/useApi";
import Likes from "../likes-page/Likes";

const PlayerPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isPlaylistsChanges, setIsPlaylistsChanges] = useState(false);
  const [currentArtist, setCurrentArtist] = useState({});
  const [artists, setArtists] = useState();
  const [isLikesPage, setIsLikesPage] = useState(false);
  const { apiFetch } = useAPI();

  const handleArtists = async () => {
    const response = await apiFetch("/artists/top/0/20");
    const body = await response.json();
    setArtists(body);
    setCurrentArtist(body[0]);
  };

  useEffect(() => {
    if (isLoading) return;
    async function fetchData() {
      await handleArtists();
    }
    fetchData();
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isLikesPage ? (
        <Likes
          exit={() => {
            setIsLikesPage(!isLikesPage);
          }}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles["middle-right"]}>
            <div className={styles["empty-div11"]}></div>

            <div className={styles["mr-middle"]}>
              <div className={styles["mr-left"]}>
                <YourLibrary
                  isPlaylistsChangesControl={{
                    isPlaylistsChanges,
                    setIsPlaylistsChanges,
                  }}
                  isLikesPageControl={{ isLikesPage, setIsLikesPage }}
                />
              </div>
              <MiddleItem
                isPlaylistsChangesControl={{
                  isPlaylistsChanges,
                  setIsPlaylistsChanges,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <MusicPlayer footerPlayer />
    </>
  );
};

export default PlayerPage;
