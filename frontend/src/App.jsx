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
import { Link, Route, Router, Routes } from 'react-router-dom';

import ChatPage from './components/chat-page/ChatPage';
import AuthForm from './components/login-page/AuthForm';

function App() {
  return (
    //<Login/>

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/login" element={<LoginButton />} />
      <Route path="/logout" element={<LogoutButton />} />
    </Routes>
    //<Register/>
    //<Main/>
    //<PlayerPage />
    //<Profile/>
    //<UserProfile/>
    //<MyProfile/>
    //<EditProfile/>
    //<ChatPage/>
    /*   <>
      <LoginButton/>
      <LogoutButton/>
      <ExampleCrud/>
  
      <ChatPage/>
      //<AuthForm/>
  
  
      </> */
  );
}

export default App;
