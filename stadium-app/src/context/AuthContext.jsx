import { createContext, useState, useContext, useCallback } from "react"
import { signUp, login } from "../lib/api/auth"
import { getUserProfile } from "../lib/api/user"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null)

  const signUpHandler = useCallback((signUpInfo) => {
    return signUp(signUpInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setIsAuth(true)
          setAuthError(null)
          localStorage.setItem('userId', res.data.user_id)
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
          localStorage.setItem('userId', res.data.user_id)
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

  const logoutHandler = useCallback(() => {
    setIsAuth(false)
  }, [])

  // Considering using `useMemo` here

  return (
    <AuthContext.Provider value={{isAuth, authError, signUpHandler, loginHandler, logoutHandler}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
