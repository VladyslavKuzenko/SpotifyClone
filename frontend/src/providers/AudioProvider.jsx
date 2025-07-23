import { createContext, useEffect, useRef, useState } from "react";
import { useAPI } from "../hooks/useApi";
import { fetchGenresTypes } from "../js/functions/functions";

export const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongList, setCurrentSongList] = useState("");
  const [originalSongList, setOriginalSongList] = useState("");
  const [isRandomList, setIsRandomList] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isListeningCountIncremented, setIsListeningCountIncremented] =
    useState(false);
  const audioRef = useRef(null);
  const [isSongPlayed, setIsSongPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const { apiFetch } = useAPI();
  const [genres, setGenres] = useState();

  /*  const [autoStart, setAutoStart] = useState(false); */

  useEffect(() => {
    if (isRandomList) {
      setOriginalSongList(currentSongList);
      const newList = shuffleArray(currentSongList);
      setCurrentSongList(newList);
      console.log("current list", newList);
    } else {
      setCurrentSongList(originalSongList);
      console.log("current list", originalSongList);
    }
    console.log(isRandomList);
  }, [isRandomList]);

  useEffect(() => {
    fetchGenres();
  },[]);

  const fetchGenres = async () => {
    const result = await fetchGenresTypes(apiFetch);
    console.log("Genres: ",result)
    setGenres(result);
  };

  const addListening = async (song) => {
    const response = await apiFetch(
      `/tracks/add-listening/${song.id}/${song.artist.id}`,
      {
        method: "PUT",
      }
    );

    if (response.ok) {
      song.listeningCount += 1;
      setIsListeningCountIncremented(true);
      console.log("Everything is ok");
    } else {
      console.error("Failed to add listening the post");
    }
  };

  function shuffleArray(array) {
    const newArray = [...array];
    if (currentSong) {
      [newArray[0], newArray[currentSongList.indexOf(currentSong)]] = [
        newArray[currentSongList.indexOf(currentSong)],
        newArray[0],
      ];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i) + 1;
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
    }

    const isSameArray = array.every((val, i) => val === newArray[i]);
    if (isSameArray) return shuffleArray(array);
    // else {
    //   for (let i = newArray.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1)) + 1;
    //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    //   }
    // }
    return newArray;
  }

  const nextSong = () => {
    if (currentSongList.indexOf(currentSong) + 1 < currentSongList.length)
      setCurrentSong(currentSongList[currentSongList.indexOf(currentSong) + 1]);
  };

  const prevSong = () => {
    if (currentSongList.indexOf(currentSong) - 1 >= 0)
      setCurrentSong(currentSongList[currentSongList.indexOf(currentSong) - 1]);
  };
  const playAudio = () => {
    audioRef.current?.play();
    setIsSongPlayed(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsSongPlayed(false);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentSongList,
        setCurrentSongList,
        audioRef,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        nextSong,
        prevSong,
        playAudio,
        pauseAudio,
        isSongPlayed,
        setIsSongPlayed,
        volume,
        setVolume,
        // shuffleArray,
        // isSongPlayed,
        isRandomList,
        setIsRandomList,
        isLoop,
        setIsLoop,
        isListeningCountIncremented,
        setIsListeningCountIncremented,
        genres
      }}
    >
      <audio
        id="myAudio"
        ref={audioRef}
        src={currentSong.sourceUrl}
        onLoadedMetadata={() => {
          setDuration(Math.floor(audioRef.current.duration));
          setVolume(audioRef.current.volume);
          playAudio();
          console.log("Volume: " + audioRef.current.volume);
        }}
        onTimeUpdate={() => {
          setCurrentTime(Math.floor(audioRef.current.currentTime));
        }}
        onEnded={() => {
          /*     setIsSongPlayed(false); */
          addListening(currentSong);
          if (isLoop) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            nextSong();
          }
        }}
        // loop={isLoop}
      ></audio>
      {children}
    </AudioContext.Provider>
  );
};
