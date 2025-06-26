import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { CLIENT_ID, DOMAIN } from "./properties/properties.js";
import { BrowserRouter } from "react-router-dom";
import { APIProvider } from "./providers/APIProvider.js";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <APIProvider>
        <App />
      </APIProvider>
    </BrowserRouter>
  </Auth0Provider>
);
