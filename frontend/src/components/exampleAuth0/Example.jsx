import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../properties/properties";

/*   This component is the example how to do request on API  */
export default function ExampleCrud() {
  const [response, setResponse] = useState();
  const {  isAuthenticated } = useAuth0();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();


/* Here we DON`T need authorization */
  const handlePublic = async () => {

    const response = await fetch("http://localhost:8080/api/public");

    const body = await response.json();
    setResponse(body.message);
  };

  /* Here we need authorization so we add token to our request */
  const handlePrivate = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: API_URL,
        },
      });
      /* VERSION FOR PROD */
      /*   const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: API_URL,
        },
      }); */
      const response = await fetch("http://localhost:8080/api/private", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setResponse(body.message);
    }
  };

  return (

    <div>
      <h2>Example public/private request:</h2> 
      <button onClick={handlePublic}>Public</button>
      <button onClick={handlePrivate}>Private</button>
      Response: {response}
    </div>
  );
}
