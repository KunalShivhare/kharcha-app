import { PropsWithChildren, createContext, useContext, useState } from 'react';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const signIn = () => setIsAuthenticated(true);
  const signOut = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
