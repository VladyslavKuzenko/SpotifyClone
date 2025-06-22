import React from 'react';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import Main from './components/main-page/Main';
import PlayerPage from './components/player-page/PlayerPage';
import Profile from './components/profile-page/Profile';
import UserProfile from './components/user-profile-page/UserProfile';
import MyProfile from './components/my-profile-page/MyProfile';
import EditProfile from './components/edit-profile-page/EditProfile';
import ExampleCrud from './components/exampleAuth0/Example';
import LoginButton from './components/exampleAuth0/LoginButton';
import LogoutButton from './components/exampleAuth0/LogoutButton';

function App() {
  return (
    //<Login/>
    //<Register/>
    //<Main/>
    //<PlayerPage />
    //<Profile/>
    //<UserProfile/>
    //<MyProfile/>
    //<EditProfile/>
    <>
    <LoginButton/>
    <LogoutButton/>
    <ExampleCrud/>

    </>
  );
}

export default App;
