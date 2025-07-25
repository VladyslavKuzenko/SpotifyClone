// import { createContext, useEffect, useState } from "react";
// import { useAPI } from "../hooks/useApi";

// export const UserInfoContext = createContext(undefined);

// export const UserInfoProvider = ({ children }) => {
//   const [userFullInfo, setUserFullInfo] = useState("");
//   const [playlists, setPlaylists] = useState([]);
//   const [songs, setSongs] = useState([]);
//   const [albums, setAlbums] = useState([]);
//   const { user, apiFetch } = useAPI();

//   useEffect(() => {
//     if (!user) return;
//     fetchUser();
//     fetchPlaylists();
//   }, [user]);

//   const fetchUser = async () => {
//     const respose = await apiFetch(`/users/${user.sub}`);
//     const data = await respose.json();

//     const responseUserFollowers = await apiFetch(
//       `/users/userFollowers/${user.sub}`
//     );
//     const followers = await responseUserFollowers.json();

//     const responseUserFollowings = await apiFetch(
//       `/users/userFollowing/${user.sub}`
//     );
//     const followings = await responseUserFollowings.json();

//     if (data.isArtist) {
//       const responseArtist = await apiFetch(`/artists/${user.sub}`);
//       const artist = await responseArtist.json();

//       const newData = { ...data, artist, followers, followings };
//       setUserFullInfo(newData);
//     } else {
//       const newData = { ...data, followers, followings };
//       setUserFullInfo(newData);
//     }
//     // setFollowings(followings);
//     // setFollowers(followers);
//     // console.log("User: ", user);
//     // console.log("User full info: ", newData);
//   };
//   const fetchPlaylists = async () => {
//     const response = await apiFetch(`/playlists/playlists/${user.sub}`);
//     const body = await response.json();
//     setPlaylists(body);
//     handleGetCurrentPlaylistTracks(body.find((i) => i.title === "Like"));
//   };

//   const handleGetCurrentPlaylistTracks = async (currentPlaylist) => {
//     const response = await apiFetch(
//       `/tracks/tracks-by-postTime/${currentPlaylist.id}`
//     );
//     const body = await response.json();
//     const newBody = body.map((item) => {
//       return { ...item, isLiked: true };
//     });
//     setSongs(newBody);
//     // setSongsFullList(body);
//   };
//   const fetchArtistAlbums = async () => {
//     const response = await apiFetch(
//       `/users/userSavedAlbums/${user.id}`
//     );
//     const body = await response.json();

//     const newData =body.map(async (item) => {
//         return { ...item, isSaved:true };
//       })
//     setAlbums(newData);
//   };
//   return (
//     <UserInfoContext.Provider value={{ userFullInfo, playlists, songs }}>
//       {children}
//     </UserInfoContext.Provider>
//   );
// };
