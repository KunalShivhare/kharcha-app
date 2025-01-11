import AsyncStorage from '@react-native-async-storage/async-storage';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { useAuthorizeNavigation } from '../navigators/navigators';

type AuthContext = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading?: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContext>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    fetchAuthStatus();
  }, [isAuthenticated]);

  const signIn = () => setIsAuthenticated(true);
  const signOut = async () => {
    await AsyncStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
