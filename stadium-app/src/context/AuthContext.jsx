import { createContext, useState, useContext, useCallback } from "react"
import { signUp } from '../api/signup'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  const register = useCallback((registerInfo) => {
    console.log('register')
    console.log(registerInfo)
    signUp(registerInfo)
    setIsAuth(true)
  })

  const login = useCallback(() => {
    console.log('login')

    // Call loginHandler in /api here


    setIsAuth(true)
    console.log(isAuth)
  }, [])

  const logout = useCallback(() => {
    setIsAuth(false)
  }, [])

  // Considering using `useMemo` here

  return (
    <AuthContext.Provider value={{isAuth, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
