import { createContext, useState, useContext, useCallback } from "react"
import { signUp, login } from "../lib/api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authError, setAuthError] = useState(null)

  const signUpHandler = useCallback(async (signUpInfo) => {
    return signUp(signUpInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setIsAuth(true)
          setAuthError(null)
          return true
        } else {
          setAuthError(res.data)
          setIsAuth(false)
          return false
        }
      })
      .catch((err) => {
        setAuthError(err.data)
        setIsAuth(false)
        return false
      })
  }, [])

  const loginHandler = useCallback(async (loginInfo) => {
    return await login(loginInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setIsAuth(true)
          setAuthError(null)
          return true
        } else {
          setAuthError(res.data)
          setIsAuth(false)
          return false
        }
      })
      .catch((err) => {
        setAuthError(err.data)
        setIsAuth(false)
        return false
      })
  }, [])

  const logout = useCallback(() => {
    setIsAuth(false)
  }, [])

  // Considering using `useMemo` here

  return (
    <AuthContext.Provider value={{isAuth, authError, signUpHandler, loginHandler, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
