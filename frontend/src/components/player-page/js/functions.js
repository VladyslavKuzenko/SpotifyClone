export function convertTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  const result =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  return result;
}

export function searchSongs(songs, searchParameter, setSongs) {
  const newSongs = songs.filter((song) => {
    if (
      song.title.toLowerCase().includes(searchParameter.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchParameter.toLowerCase())
    )
      return song;
  });

  setSongs(newSongs);
}
