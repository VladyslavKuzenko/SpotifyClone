import { createContext, useEffect, useRef, useState } from "react";
import { API_URL, BASE_API_URL } from "../js/properties/properties";
import { useAuth0 } from "@auth0/auth0-react";

export const APIContext = createContext(undefined);

export const APIProvider = ({ children }) => {
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false);
  const [profileConfirmationLoading, setProfileConfirmationLoading] =
    useState(true);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongList, setCurrentSongList] = useState("");
  const audioRef = useRef(null);
  const [isSongPlayed, setIsSongPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const nextSong = () => {
    if (currentSongList.indexOf(currentSong) + 1 < currentSongList.length)
      setCurrentSong(currentSongList[currentSongList.indexOf(currentSong) + 1]);
  };
  const prevSong = () => {
    if (currentSongList.indexOf(currentSong) - 1 >= 0)
      setCurrentSong(currentSongList[currentSongList.indexOf(currentSong) - 1]);
  };

  const apiFetch = async (path, options = {}) => {
    let headers = options.headers || {};

    if (isAuthenticated) {
      try {
        console.log("token start");

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: API_URL,
          },
        });

        console.log("Token: " + token);

        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      } catch (e) {
        console.log("Failed to get token");
      }
    }

    return await fetch(`${BASE_API_URL}${path}`, {
      ...options,
      headers,
    });
  };

  const refreshProfileConfirmation = async () => {
    if (!isAuthenticated || !user?.sub) return;

    setProfileConfirmationLoading(true);
    try {
      const res = await apiFetch(`/users/hasProfileConfirmation/${user.sub}`);
      const data = await res.json();
      setIsProfileConfirmed(data);
    } catch {
      setIsProfileConfirmed(false);
    } finally {
      setProfileConfirmationLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      refreshProfileConfirmation();
    }
  }, [isAuthenticated, user?.sub]);

  return (
    <APIContext.Provider
      value={{
        isProfileConfirmed,
        profileConfirmationLoading,
        apiFetch,
        currentSong,
        setCurrentSong,
        currentSongList,
        setCurrentSongList,
        refreshProfileConfirmation,
        nextSong,
        prevSong,
        audioRef,
        isSongPlayed,
        setIsSongPlayed,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        volume,
        setVolume,
      }}
    >
      <>{children}</>
    </APIContext.Provider>
  );
};
