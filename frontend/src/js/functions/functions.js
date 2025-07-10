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

export function searchUsers(users, searchParameter, setUsers) {
  // console.log("users list inside function");
  // console.log(users);
  if (searchParameter.length > 0) {
    const newUsersList = users.filter((user) => {
      if (
        user.firstName.toLowerCase().includes(searchParameter.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchParameter.toLowerCase()) ||
        user.username.toLowerCase().includes(searchParameter.toLowerCase())
      )
        return user;
    });
    setUsers(newUsersList);
  } else setUsers(users);
}

export function getUser_metadata_firstName(user) {
  return user["https://diplomaapp.com/firstName"];
}

export function getUser_metadata_lastName(user) {
  return user["https://diplomaapp.com/lastName"];
}

export async function isUserPlaylistContainsSong(
  song,
  user,
  getAccessTokenSilently
) {
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
  const playlist = body.find((i) => i.title === "Like");
  const responsePlaylistTracks = await fetch(
    `http://localhost:8080/tracks/tracks/${playlist.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tracks = await responsePlaylistTracks.json();

  //var playlist = body;
  /* console.log(song) */
  const result = tracks.some((track) => track.id === song.id);
  /*   console.log("isUserPlaylistContainsSong: " + result); */
  return result;
}

export async function isSubscribed(
  user,
  userToCheckSubscription,
  getAccessTokenSilently
) {
  const token = await getAccessTokenSilently({
    authorizationParams: {
      audience: API_URL,
    },
  });
  const response = await fetch(
    `http://localhost:8080/users/userFollowing/${user.sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const body = await response.json();
  // console.log("isSubscribed: ");
  // console.log(body);
  var isSubscribed = body.some((i) => i.id === userToCheckSubscription.id);
  return isSubscribed;
}

export async function isLiked(post, user, apiFetch) {
  // console.log("isLiked called");
  // console.log("user",user);
  // console.log("post",post);
  const response = await apiFetch(`/users/userLikedPosts/${user.sub}`);
  const body = await response.json();
  // console.log("body",body);

  var isLiked = body.some((i) => i.id === post.id);
  // console.log("isLiked: " + isLiked);
  return isLiked;
}

export async function handleUploadFile(content, file, apiAxiosPost, path) {
  if (!file) return;

  // console.log(file);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await apiAxiosPost(`${path}${content.id}`, formData);
    const data = res.data;

    // alert("Файл успішно надіслано: " + res.data);

    return data;
  } catch (err) {
    alert("Помилка: " + err.message);
  }
}
