import { createContext, useEffect, useState } from 'react';
import { BASE_API_URL } from '../properties/properties';
import { useAuth0 } from '@auth0/auth0-react';

export const APIContext = createContext(undefined);

export const APIProvider = ({ children }) => {
  const [isProfileConfirmed, setIsProfileConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth0();

  const apiFetch = async (path, options) => {
    const authHeader = undefined;

    if (token !== undefined) {
      authHeader = {
        headers: {
          Authorization: `Bearer ${token !== undefined ? token : ""}`,
        }
      }
    }
    
    return await fetch(`${BASE_API_URL}${path}`, {
      ...options,
      authHeader
    });
  };

  const fetchAuth = async () => {
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
    if (user?.sub) fetchAuth();
  }, [user?.sub]);

  return (
    <APIContext.Provider value={{ isProfileConfirmed, loading, refresh: fetchAuth, apiFetch }}>
      {children}
    </APIContext.Provider>
  );
};