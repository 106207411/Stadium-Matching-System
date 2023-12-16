import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify'
import Entry from './pages/Auth/Entry'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import SportType from './pages/Auth/SportType'
import SportRating from './pages/Auth/SportRating'
import ActivityList from './pages/Activity/ActivityList'
import StadiumList from './pages/Stadium/StadiumList'
import MessageList from './pages/Message/MessageList'
import Profile from './pages/Profile/Profile'
import LikeList from './pages/Like/LikeList'
import ActivityInfo from './pages/Activity/ActivityInfo';
import MyActivityList from './pages/Activity/MyActivityList';
import './index.css'
import IssueReport from './pages/Stadium/IssueReport'

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Entry />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/sportType' element={<SportType />} />
      <Route path='/register/rating' element={<SportRating />} />

      {/* Protected Routes */}
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/activity/list' element={<ProtectedRoute><ActivityList /></ProtectedRoute>} />
      <Route path='/stadium/list' element={<ProtectedRoute><StadiumList /></ProtectedRoute>} />
      <Route path='/message/list' element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
      <Route path='/like/list' element={<ProtectedRoute><LikeList /></ProtectedRoute>} />
      <Route path='/activity/mylist/:activity_id' element={<ProtectedRoute><ActivityInfo /></ProtectedRoute>} />
      <Route path='/activity/mylist' element={<ProtectedRoute><MyActivityList /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
