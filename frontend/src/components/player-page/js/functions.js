export function convertTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  const result =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  return result;
}

export function searchSongs(songs, searchParameters) {
  const newSongs = songs.map(
    (song) =>
      song.title.includes(searchParameters) ||
      song.artist.includes(searchParameters)
  );
  
  return newSongs;
}
