import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../js/properties/properties";
import { getUser_metadata_firstName } from "../../js/functions/functions";
/*   This component is the example how to do request on API  */
export default function ExampleCrud() {
  const [response, setResponse] = useState();
  const [artist, setArtist] = useState();
  const [user, setUser] = useState();
  const { isAuthenticated } = useAuth0();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  /*Example how to get users_metadata */
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(getUser_metadata_firstName(user));
      console.log("First name: " + firstName);
    }
  }, [user]);

  /* Here we DON`T need authorization */
  const handlePublic = async () => {
    const response = await fetch("http://localhost:8080/api/public");

    const body = await response.json();
    setResponse(body.message);
  };

  /* Here we need authorization so we add token to our request */
  const handlePrivate = async () => {
    if (isAuthenticated) {
      /*    const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: API_URL,
        },
      }); */
      /* VERSION FOR PROD */
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch("http://localhost:8080/api/private", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setResponse(body.message);
    }
  };
  const handleArtist = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch("http://localhost:8080/artists/top", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setArtist(body);
    }
  };
  const handleUser = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      });
      const response = await fetch("http://localhost:8080/users/8", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setUser(body);
      console.log(body.lastname);
    }
  };
  return (
    <div>
      <h2>Example public/private request:</h2>
      <button onClick={handlePublic}>Public</button>
      <button onClick={handlePrivate}>Private</button>
      <button onClick={handleArtist}>Test Artist</button>
      <button onClick={handleUser}>Test User</button>
      Response: {response}
      <p>
        User: {user && user.lastname} {user && user.firstname}
      </p>
      <p>
        Artist: {artist && artist.user.lastname}{" "}
        {artist && artist.user.firstname}
      </p>
    </div>
  );
}
