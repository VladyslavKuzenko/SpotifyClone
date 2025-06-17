import "./App.css";
import ExampleCrud from "./components/Example";
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import Users from "./components/Users";
import Profile from "./components/Profile";

function App() {

 
  return (
    <div>
      <LoginButton />
      <LogoutButton />
      <ExampleCrud />
      <Profile/>
      <Users/>
      
    </div>
  );
}

export default App;
