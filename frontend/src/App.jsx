import Main from './components/main-page/Main';
import PlayerPage from './components/player-page/PlayerPage';
import UserProfile from './components/user-profile-page/UserProfile';
import MyProfile from './components/my-profile-page/MyProfile';

import Rating from './components/rating-page/Rating';
import Likes from './components/likes-page/Likes';
import LoginButton from './components/exampleAuth0/LoginButton';
import LogoutButton from './components/exampleAuth0/LogoutButton';
import { Route, Routes } from 'react-router-dom';

import ChatPage from './components/chat-page/ChatPage';
import ProfileSetup from './components/profile-page/ProfileSetup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/login" element={<LoginButton />} />
      <Route path="/logout" element={<LogoutButton />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/my-profile" element={<MyProfile />} />

      <Route path="/rating" element={<Rating />} />
      <Route path="/likes" element={<Likes />} />
      <Route path="/profileSetup" element={<ProfileSetup />} />
      {/*    <Route path="/profile" element={<Profile />} /> */}


    </Routes>
    //<Login/>
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
