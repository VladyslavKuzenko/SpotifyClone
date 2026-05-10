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
import { hiddenLeftSideRoutes } from './constants/hiddenRoutes'

import Test from "./components/exampleAuth0/Test";
import LeftSide from "./components/main-components/LeftSide";

import { routes } from './router/routes'

function App() {
  const location = useLocation();
  const shouldHideLeftSide = hiddenLeftSideRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideLeftSide && <LeftSide />}
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
