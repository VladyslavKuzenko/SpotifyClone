import Main from "./components/main-page/Main";
import PlayerPage from "./components/player-page/PlayerPage";
import UserProfile from "./components/user-profile-page/UserProfile";
import MyProfile from "./components/my-profile-page/MyProfile";
import Rating from "./components/rating-page/Rating";
import Likes from "./components/likes-page/Likes";
import ChatPage from "./components/chat-page/ChatPage";
import ProfileSetup from "./components/profile-page/ProfileSetup";
import EditProfile from "./components/edit-profile-page/EditProfile";

import LoginButton from "./components/exampleAuth0/LoginButton";
import LogoutButton from "./components/exampleAuth0/LogoutButton";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Test from "./components/exampleAuth0/Test";
import LeftSide from "./components/main-components/LeftSide";

function App() {
  const location = useLocation();
  const hiddenLeftSideRoutes = ["/chat"];
  const shouldHideLeftSide = hiddenLeftSideRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideLeftSide && <LeftSide />}
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/login" element={<LoginButton />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/rating" element={<Rating />} />
        <Route path="/likes" element={<Likes />} />
        <Route path="/profileSetup" element={<ProfileSetup />} />
        <Route path="/test" element={<Test />} />
        {/*    <Route path="/profile" element={<Profile />} /> */}
        {/*    <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </>
  );
}

export default App;
