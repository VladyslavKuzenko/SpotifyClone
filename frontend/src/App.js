import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('http://localhost:8080/users');
      const body = await response.json();
      setUsers(body);
    }

    fetchClients();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Users</h2>
          {users.map(client =>
            <div key={client.id}>
              {client.name} ({client.email})
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
