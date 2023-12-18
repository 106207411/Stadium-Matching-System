import { useState, CSSProperties } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify'
import Entry from './pages/Auth/Entry'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import SportType from './pages/Auth/SportType'
import SportRating from './pages/Auth/SportRating'
import ActivityList from './pages/Activity/ActivityList'
import AllActivityInfo from './pages/Activity/AllActivityinfo';
import StadiumList from './pages/Stadium/StadiumList'
import MessageList from './pages/Message/MessageList'
import Reserve from './pages/Reserve/Reserve'
import Stadiuminfo from './pages/Stadium/StadiumInfo'
import CreateActive from './pages/Stadium/CreateActive'
import CreateSucess from './pages/Stadium/CreateSucess'
import Home_admin from './pages/admin/home_admin'
import Add_admin from './pages/admin/add_admin'
import Profile from './pages/Profile/Profile'
import LikeList from './pages/Like/LikeList'
import ActivityInfo from './pages/Activity/ActivityInfo';
import MyActivityList from './pages/Activity/MyActivityList';
import './index.css';
import IssueReport from './pages/Stadium/IssueReport';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import Spinner from './components/Spinner/Spinner';

const ProtectedRoute = ({ children }) => {
  const isAuthOrNot = localStorage.getItem('isAuth');
  return isAuthOrNot ? children : <Navigate to="/" />;
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
      <Route path='/admin/home' element={<Home_admin />} />
      <Route path='/admin/add' element={<Add_admin />} />

      {/* Protected Routes */}
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/activity/list' element={<ProtectedRoute><ActivityList /></ProtectedRoute>} />
      <Route path='/activity/:activity_id' element={<ProtectedRoute><AllActivityInfo /></ProtectedRoute>} />
      <Route path='/report-issue' element={<ProtectedRoute><IssueReport /></ProtectedRoute>} />
      <Route path='/stadium/list' element={<ProtectedRoute><StadiumList /></ProtectedRoute>} />
      <Route path='/message/list' element={<ProtectedRoute><MessageList /></ProtectedRoute>} />
      <Route path='/like/list' element={<ProtectedRoute><LikeList /></ProtectedRoute>} />
      <Route path='/activity/mylist/:activity_id' element={<ProtectedRoute><ActivityInfo /></ProtectedRoute>} />
      <Route path='/activity/mylist' element={<ProtectedRoute><MyActivityList /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/reserve' element={<ProtectedRoute><Reserve /></ProtectedRoute>} />
      <Route path='/stadium/info' element={<ProtectedRoute><Stadiuminfo /></ProtectedRoute>} />
      <Route path='/stadium/create' element={<ProtectedRoute><CreateActive /></ProtectedRoute>} />
      <Route path='/stadium/createsucess' element={<ProtectedRoute><CreateSucess /></ProtectedRoute>} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const MainApp = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Spinner />}
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <ToastContainer />
          <MainApp />
        </AuthProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};

export default App;
