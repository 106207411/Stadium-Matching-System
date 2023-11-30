import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Entry from './pages/Auth/Entry'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import SportType from './pages/Auth/SportType'
import SportRating from './pages/Auth/SportRating'
<<<<<<< Updated upstream
=======
import ActivityList from './pages/Activity/ActivityList'
import StadiumList from './pages/Stadium/StadiumList'
import MessageList from './pages/Message/MessageList'
import Reserve from './pages/Reserve/Reserve'
>>>>>>> Stashed changes
import './index.css'

const AppRoutes = () => {
  const { isAuth } = useAuth()

  return (
    <Routes>
      <Route path='/' element={<Entry />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/sportType' element={<SportType />} />
      <Route path='/register/rating' element={<SportRating />} />
      <Route path='/home' element={isAuth ? <Home /> : <Navigate to="/" />} />
<<<<<<< Updated upstream
=======
      <Route path='/activity/list' element={<ActivityList />} />
      <Route path='/stadium/list' element={<StadiumList />} />
      <Route path='/message/list' element={<MessageList />} />
      <Route path='/reserve' element={<Reserve />} />
>>>>>>> Stashed changes
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
