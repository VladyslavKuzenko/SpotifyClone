import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CLIENT_ID, DOMAIN } from "./js/properties/properties.js";
import { APIProvider } from "./providers/APIProvider.jsx";
import LeftSide from "./components/main-components/LeftSide.jsx";
import { AudioProvider } from "./providers/AudioProvider.jsx";
import { UserInfoProvider } from "./providers/UserInfoProvider.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/main`,
    }}
  >
    <BrowserRouter>
      <APIProvider>
        <AudioProvider>
          {/* <UserInfoProvider> */}
            <App />
          {/* </UserInfoProvider> */}
        </AudioProvider>
      </APIProvider>
    </BrowserRouter>
  </Auth0Provider>
);
