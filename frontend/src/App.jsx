import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ExampleCrud from "./ExampleCrud";
import LoginButton from "./login";
import LogoutButton from "./logout";

function App() {
  const [users, setUsers] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  const handleUsers = async () => {
    console.log("useEffect WORKING");
    console.log(`IsAuthenticated ${isAuthenticated}`);
    console.log(`IsLoading ${isLoading}`);
    if (isAuthenticated) {
      console.log("Запит надіслано");

      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://diploma-api/",
        },
      });
      /*   const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://diploma-api/",
        },
      }); */
      console.log(`TOKEN: ${token}`);
      const response = await fetch("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const body = await response.json();
      setUsers(body);
    }
  };
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <ExampleCrud />
      <button onClick={handleUsers}>Get Users</button>
      {isAuthenticated && (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Users</h2>
              {users.map((client) => (
                <div key={client.id}>
                  {client.name} ({client.email})
                </div>
              ))}
            </div>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
