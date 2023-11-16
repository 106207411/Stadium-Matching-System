import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Entry from './pages/Auth/Entry'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import SportType from './pages/Auth/SportType'
import SportRating from './pages/Auth/SportRating'
import ActivityList from './pages/Activity/ActivityList'
//import ActivitiesList from './pages/Activity/nActivityList'
// import Stadium from './pages/Stadium/Stadium'
// import Message from './pages/Message/Message'
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
      <Route path='/activity/list' element={<ActivityList />} />
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
