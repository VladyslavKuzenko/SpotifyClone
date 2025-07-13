import { createContext, useEffect, useRef, useState } from "react";

export const AudioContext = createContext(undefined);

export const AudioProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState("");
  const [currentSongList, setCurrentSongList] = useState("");
  const audioRef = useRef(null);
  const [isSongPlayed, setIsSongPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  /*  const [autoStart, setAutoStart] = useState(false); */

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

          nextSong();
        }}
      ></audio>
      {children}
    </AudioContext.Provider>
  );
};
