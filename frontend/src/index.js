import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import { CLIENT_ID, DOMAIN } from './properties/properties.js';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain={DOMAIN}
    clientId={CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  
  </Auth0Provider>,
);