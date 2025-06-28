import { createContext, useEffect, useState } from 'react';
import { API_URL, BASE_API_URL } from '../properties/properties';
import { useAuth0 } from '@auth0/auth0-react';

export const APIContext = createContext(undefined);

export const APIProvider = ({ children }) => {
  const { isProfileConfirmed, setIsProfileConfirmed } = useState(false);
  const { loading, setLoading } = useState(true);
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const apiFetch = async (path, options = {}) => {
    let headers = options.headers || {};

    if (isAuthenticated) {
      try {
        console.log("token start");

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: API_URL,
          },
        });

        console.log("Token: " + token);

        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      } catch (e) {
        console.error("Failed to get token:", e);
      }
    }

    return await fetch(`${BASE_API_URL}${path}`, {
      ...options,
      headers,
    });
  };

  const fetchAuth = async () => {
    if (!isAuthenticated || !user?.sub) return;

    setLoading(true);
    try {
      const res = await apiFetch(`/users/hasProfileConfirmation/${user.sub}`);
      const data = await res.json();
      setIsProfileConfirmed(data);
    } catch {
      setIsProfileConfirmed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      fetchAuth();
    }
  }, [isAuthenticated, user?.sub]);

  return (
    <APIContext.Provider value={{ isProfileConfirmed, loading, apiFetch }}>
      {children}
    </APIContext.Provider>
  );
};
