import { createContext, useState, useContext, useCallback } from "react"
import { signUp, login, logout } from "../lib/api/auth";
import { useLoading } from "./LoadingContext";
// 可設計成登入後即 fetch 各個頁面的資料
import { getUserProfile } from "../lib/api/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [authError, setAuthError] = useState(null);
  const { toggleLoading } = useLoading();
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const signUpHandler = useCallback((signUpInfo) => {
    toggleLoading(true);
    return signUp(signUpInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem('isAuth', true);
          localStorage.setItem('userId', res.data.user_id);
          return res.data
        } else {
          localStorage.setItem('isAuth', false);
          return false;
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        // setAuthError(err.response.data);
        // 回傳錯誤訊息以顯示 toast
        return err.response.data;
      })
      .finally(() => {
        toggleLoading(false);
      });
  }, [toggleLoading]);

  const loginHandler = useCallback((loginInfo) => {
    toggleLoading(true);
    return login(loginInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          localStorage.setItem('isAuth', true);
          localStorage.setItem('userId', res.data.user_id);
          return res.data
        } else {
          localStorage.setItem('isAuth', false);
          return false;
        };
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      })
      .finally(() => {
        toggleLoading(false);
      });
  }, [toggleLoading]);

  const logoutHandler = useCallback(() => {
    toggleLoading(true);
    return logout()
      .then((res) => {
        console.log(res);
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userId');
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      })
      .finally(() => {
        toggleLoading(false);
      });
  }, [toggleLoading]);

  // Considering using `useMemo` here

  return (
    <AuthContext.Provider value={{isAuth, signUpHandler, loginHandler, logoutHandler}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
