import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../properties/properties";

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
      song.title.toLowerCase().includes(searchParameter.toLowerCase()) /* || */
      //song.artist.toLowerCase().includes(searchParameter.toLowerCase())
    )
      return song;
  });

  setSongs(newSongs);
}

export function getUser_metadata_firstName(user) {
  return user["https://diplomaapp.com/firstName"];
}

export function getUser_metadata_lastName(user) {
  return user["https://diplomaapp.com/lastName"];
}

export async function isUserPlaylistContainsSong(song,user,getAccessTokenSilently) {
    const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: API_URL,
          },
        });
  const responsePlaylist = await fetch(
    `http://localhost:8080/playlists/playlists/${user.sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await responsePlaylist.json();
  const playlist =body.find((i) => i.title === "Like");
  const responsePlaylistTracks = await fetch(
    `http://localhost:8080/tracks/tracks/${playlist.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tracks=await responsePlaylistTracks.json();

  //var playlist = body;
  /* console.log(song) */
  const result=tracks.some(track => track.id === song.id);
/*   console.log("isUserPlaylistContainsSong: " + result); */
  return result
}
