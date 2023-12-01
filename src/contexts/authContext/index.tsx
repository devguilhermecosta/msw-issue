import { FormEvent, ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { tokenRefreshVerify } from '../../utils/auth';

interface AuthContextData {
  userTokens: string | null;
  isAuthenticated: string | null,
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<AxiosResponse>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userTokens, setUserTokens] = useState<string | null>(localStorage.getItem('userTokens'));
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(localStorage.getItem('userTokens'));

  const handleLogin = async function(event: FormEvent<HTMLFormElement>): Promise<AxiosResponse> {
    /**
     * Authenticate the user.
     * if username and password are corrects, the token refresh is stored on localStorage and
     * the isAuthenticate will be truthy.
     */
    const url = 'http://127.0.0.1:8000/api/token/';

    const response = await axios.post(url, {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    return new Promise(function(resolve, reject) {
      if (response.status !== 200) return reject('unauthorized');
    
      const tokenRefresh = JSON.stringify(response.data.refresh);
      const tokenAccess = JSON.stringify(response.data.access);

      localStorage.setItem('userTokens', tokenRefresh);
      setUserTokens(tokenRefresh);
      setIsAuthenticated(tokenAccess);

      return resolve(response);
    })
  }

  const handleLogout = (): void => {
    setIsAuthenticated(null);
    setUserTokens(null);
    localStorage.removeItem('userTokens');
  }

  const updateToken = useCallback(() => {
    /**
     * Renew the token access and keeps the user logged in.
     * If the token refresh is invalid, the user will be logged out.
     */
    function handleUpdateToken(): void {
      tokenRefreshVerify(userTokens)
      .then(response => {
        setIsAuthenticated(response.data.access);
      })
      .catch(() => {
        setIsAuthenticated(null);
        handleLogout();
      })
    }

    handleUpdateToken();

  }, [userTokens])

  useEffect(() => {
    /**
     * Renew the token access every 4 minutes.
     * If the token refresh is invalid, the user will be logged out.
     */
    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    const interval = setInterval(() => {
        if(userTokens){
            updateToken();
        }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [updateToken, userTokens])

  return (
    <AuthContext.Provider value={{
      userTokens: userTokens,
      isAuthenticated: isAuthenticated,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// TODO usar variáveis de ambiente para as urls e tempo de refresh.