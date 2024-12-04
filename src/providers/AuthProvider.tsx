import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type AuthContext = {
  signIn: () => void
  signOut: () => void
  session?: string | null
  isLoading?: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContext>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isAuthenticated: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setIsAuthenticated(true)
        },
        signOut: () => {
          setIsAuthenticated(false)
        },
        //   user: session?.user,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
