/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="diploma-project.eu.auth0.com"
    clientId="EFshQKP7sSk2T9spVs8jG4B7BF3vg7Ml"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  
  </Auth0Provider>,
);