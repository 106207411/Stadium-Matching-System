import { createContext, useState, useContext, useCallback } from "react"
import { signUp, login } from "../lib/api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authError, setAuthError] = useState(null)

  const signUpHandler = useCallback((signUpInfo) => {
    return signUp(signUpInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setIsAuth(true)
          setAuthError(null)
          return res.data
        } else {
          setAuthError(res.data)
          setIsAuth(false)
          return false
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        setAuthError(err.response.data)
        setIsAuth(false)
        // 回傳錯誤訊息以顯示 toast
        return err.response.data
      })
  }, [])

  const loginHandler = useCallback((loginInfo) => {
    return login(loginInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setIsAuth(true)
          setAuthError(null)
          return res.data
        } else {
          setAuthError(res.data)
          setIsAuth(false)
          return false
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        setAuthError(err.data)
        setIsAuth(false)
        // 回傳錯誤訊息以顯示 toast
        return err.response.data
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
