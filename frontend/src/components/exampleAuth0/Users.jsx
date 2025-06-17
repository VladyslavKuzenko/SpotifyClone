import logo from "../logo.svg";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../properties/properties";

/*This component is the example how to do request on API. Response is the list of users from database.
 If you have not database  or you don`t want use it in this example, you can remove this component or comment it in App.jsx component */
export default function Users() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenWithPopup } = useAuth0();

  const handleUsers = async () => {
    if (isAuthenticated) {

      const token = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: API_URL,
        },
      });

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
      <h2>Example private request and response with data from database: </h2>
      <button onClick={handleUsers}>Get Users</button>
      {isAuthenticated && (
         <div className="App-intro">
              <h3>Users:</h3>
              {users.map((client) => (
                <div key={client.id}>
                  {client.name} ({client.email})
                </div>
              ))}
            </div>
      )}
    </div>
  );
}
