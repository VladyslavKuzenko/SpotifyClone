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
  console.log("Track inside search", songs);
  const newSongs = songs.filter((song) => {
    if (
      song.title.toLowerCase().includes(searchParameter.toLowerCase()) ||
      song.artist.user.username
        .toLowerCase()
        .includes(searchParameter.toLowerCase())
    )
      return song;
  });

  setSongs(newSongs);
}

export function searchUsers(users, searchParameter, setUsers) {
  // console.log("users list inside function");
  // console.log(users);
  // if (searchParameter.length > 0) {
  const newUsersList = users.filter((user) => {
    if (
      user.firstName.toLowerCase().includes(searchParameter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchParameter.toLowerCase()) ||
      user.username.toLowerCase().includes(searchParameter.toLowerCase())
    )
      return user;
  });
  setUsers(newUsersList);
  // } else setUsers(users);
}

export function getUser_metadata_firstName(user) {
  return user["https://diplomaapp.com/firstName"];
}

export function getUser_metadata_lastName(user) {
  return user["https://diplomaapp.com/lastName"];
}

export async function isUserPlaylistContainsSong(song, user, apiFetch) {
  const responsePlaylist = await apiFetch(`/playlists/playlists/${user.sub}`);
  const body = await responsePlaylist.json();
  const playlist = body.find((i) => i.title === "Like");
  const responsePlaylistTracks = await apiFetch(
    `/tracks/tracks-by-postTime/${playlist.id}`
  );
  const tracks = await responsePlaylistTracks.json();
  //var playlist = body;
  /* console.log(song) */
  const result = tracks.some((track) => track.id === song.id);
  /*   console.log("isUserPlaylistContainsSong: " + result); */
  return result;
}

export async function isSubscribed(user, userToCheckSubscription, apiFetch) {
  const response = await apiFetch(`/users/userFollowing/${user.sub}`);
  const body = await response.json();
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
    console.log("apiAxiosPost");
    const res = await apiAxiosPost(`${path}${content.id}`, formData);
    const data = res.data;

    // alert("Файл успішно надіслано: " + res.data);

    return data;
  } catch (err) {
    alert("Помилка: " + err.message);
  }
}

const fetchArtistData = async (userId, apiFetch) => {
  console.log("USER ID: ", userId);
  const response = await apiFetch(`/artists/byUser/${userId}`);
  console.log("RESPONSE: ", response);

  const data = await response.json();
  return data;
};

export const submiteMusic = async (
  songTitle,
  song,
  songImage,
  selectedGenre,
  userId,
  apiFetch,
  apiAxiosPost,
  musicImgUrl,
  albumId
) => {
  const artist = await fetchArtistData(userId, apiFetch);
  const album = albumId ? { id: albumId } : {};
  console.log("Album id: ", albumId);
  const resultMusic = {
    artist: { id: artist.id },
    album: album,
    title: songTitle,
    listeningCount: 0,
    createdAt: new Date().toISOString(),
  };
  console.log("Result Music", resultMusic);
  const response = await apiFetch("/tracks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultMusic),
  });
  console.log("POST SUCCESS");
  const music = await response.json();

  musicImgUrl = musicImgUrl
    ? musicImgUrl
    : (musicImgUrl = await handleUploadFile(
        music,
        songImage,
        apiAxiosPost,
        "/tracks/upload/"
      ));
  const musicUrl = await handleUploadFile(
    music,
    song,
    apiAxiosPost,
    "/tracks/upload/"
  );

  music.sourceUrl = musicUrl;
  music.imageUrl = musicImgUrl;

  const responseUpdate = await apiFetch(`/tracks/${music.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(music),
  });
  return music.id;
};

export const submitAlbum = async (
  albumTitle,
  songTitles,
  songList,
  songImage,
  selectedGenre,
  userId,
  apiFetch,
  apiAxiosPost
) => {
  const artist = await fetchArtistData(userId, apiFetch);

  const resultAlbum = {
    artist: { id: artist.id },
    title: albumTitle,
  };
  const response = await apiFetch("/albums", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resultAlbum),
  });
  const album = await response.json();

  const musicImgUrl = await handleUploadFile(
    album,
    songImage,
    apiAxiosPost,
    "/tracks/upload/"
  );

  var musicList = [];
  songList.map((item, index) => {
    const songId = submiteMusic(
      songTitles[index],
      item,
      songImage,
      selectedGenre,
      userId,
      apiFetch,
      apiAxiosPost,
      musicImgUrl,
      album.id
    );
    musicList += { id: songId };
  });

  album.tracks = musicList;
  album.imageUrl = musicImgUrl;
  const responseUpdate = await apiFetch(`/albums/${album.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(album),
  });
};


