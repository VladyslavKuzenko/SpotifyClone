import Main from './components/main-page/Main';
import PlayerPage from './components/player-page/PlayerPage';

import LoginButton from './components/exampleAuth0/LoginButton';
import LogoutButton from './components/exampleAuth0/LogoutButton';
import { Route, Routes } from 'react-router-dom';

import ProfileSetup from './components/profile-page/ProfileSetup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/player" element={<PlayerPage />} />
      <Route path="/login" element={<LoginButton />} />
      <Route path="/logout" element={<LogoutButton />} />
      <Route path="/profileSetup" element={<ProfileSetup />} />
    </Routes>
  );
}

export default App;
