import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ExampleCrud() {
  const [response, setResponse] = useState();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const handlePublic = async () => {
    console.log("WORKING");
    console.log(`IsAuthenticated ${isAuthenticated}`);
    console.log(`IsLoading ${isLoading}`);
    console.log("request is sending");

    const response = await fetch("http://localhost:8080/api/public");

    const body = await response.json();
    setResponse(body.message);
  };
  const handlePrivate = async () => {
    console.log("WORKING");
    console.log(`IsAuthenticated ${isAuthenticated}`);
    console.log(`IsLoading ${isLoading}`);
    if (isAuthenticated) {
      console.log("request is sending");

      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://diploma-api/",
        },
      });
      /* VERSION FOR PROD */
      /*   const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://diploma-api/",
        },
      }); */
      console.log(`TOKEN: ${token}`);
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
      <button onClick={handlePublic}>Public</button>
      <button onClick={handlePrivate}>Private</button>
      Response: {response}
    </div>
  );
}
