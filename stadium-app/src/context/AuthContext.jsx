import { createContext, useState, useContext, useCallback } from "react"
import { signUp, login } from "../lib/api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  const signUpHandler = useCallback((registerInfo) => {
    signUp(registerInfo)
    setIsAuth(true)
  })

  const loginHandler = useCallback((loginInfo) => {
    login(loginInfo)
    setIsAuth(true)
  }, [])

  const logout = useCallback(() => {
    setIsAuth(false)
  }, [])

  // Considering using `useMemo` here

  return (
    <AuthContext.Provider value={{isAuth, signUpHandler, loginHandler, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
