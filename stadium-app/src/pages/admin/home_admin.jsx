import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import Header from '../../components/Header/Header.jsx';
import AdminHeader from '../../components/Header/AdminHeader.jsx';
import AdminFooter from '../../components/FooterBar/AdminFooter';
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAdminStadiumList } from '../../api';
import { IoIosAddCircleOutline } from "react-icons/io"
import LoadingSpinner from '../../components/Loading/LoadingPage';
import './home_admin.scss';

const Home_admin = () => {
  const { logoutHandler } = useAuth();

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stadiums', 'badminton'],
    queryFn: () => fetchAdminStadiumList()
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const stadiumList = data?.stadium || [];

  // 點選後導向頁面要改，目前是 user version
  const handleStadiumSelect = (stadiumId, category) => {
    localStorage.setItem('selectedStadiumId', stadiumId);
    localStorage.setItem('selectedCategory', category);
    navigate('/reserve'); // Navigate to the reservation page
  };

  return (
    <div>
      <AdminHeader title="您的場地"/>
      <div className="auth-stadium-list">
        {stadiumList.map((stadium) => (
              <div 
              key={stadium.id} 
              className="auth-stadium-item" 
              onClick={() => handleStadiumSelect(stadium.stadium_id, 'badminton')}
            >
            <img src={stadium.picture} alt={stadium.title} />
            <div className="auth-stadium-info">
              <div className="auth-name-address">
                <h3>{stadium.name}</h3>
                <span className="auth-address">{stadium.address}</span>
              </div>
              <div className="auth-stadium-price">
                <p>{stadium.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='auth-upload-icon' onClick={() => navigate('/admin/upload')}>
        <span className='icon-wrapper'>
          <IoIosAddCircleOutline size={64} color='dodgerblue'/>
        </span>
      </div>
      <AdminFooter />
    </div>
  );
};

export default Home_admin;

// <div className="home-container">
    //   <div className="button-container" onClick={logout}>
    //     <PiSignOutBold />
    //   </div>

    //   <div className="search-bar">
    //     <input type="search" placeholder="Search for activities..." />
    //     <GoSearch className="search-icon" onClick={handleSearchIconClick} />
    //   </div>

    //   <div className="options-container">
    //     <div className="options-section">

    //       <button
    //         className={`option ${selectedOption === 'List' ? 'active' : ''}`}
    //         onClick={() => toggleOption('List')}>
    //         List
    //       </button>
    //       <button
    //         className={`option ${selectedOption === 'Map' ? 'active' : ''}`}
    //         onClick={() => toggleOption('Map')}>
    //         Map
    //       </button>
    //     </div>
    //   </div>
    //   {selectedOption === 'List' ? (
    //     <>
    //       <div className="sports-container">
    //         <div className="title-container">
    //           <div className="title-left">場地</div>
    //           <div className="title-right">
    //             <span onClick={gotoStadium} style={{ cursor: 'pointer' }}>更多</span>
    //           </div>
    //         </div>
    //         <div className="sports-section">
    //           {sports.map(sport => (
    //             <div key={sport} className="sport">
    //               <img src={`/${sport}.png`} alt={sport} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <div className="map-container">
    //         <div style={{ textAlign: 'center' }}>
    //           to be continued...
    //         </div>
    //       </div>
    //     </>
    //   )}
    // <div className='addstadium'>
    //   <div style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //   }}>
    //     <Button variant="contained" onClick={() => navigate('../admin/add')}>上架场地</Button>
    //   </div>
    // </div> 
    // <div className='feedback'>
    //   <div style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     marginTop: "30px",
    //   }}>
    //     <Button variant="contained" onClick={() => navigate('../admin/feedback')}>反饋列表</Button>
    //   </div>
    // </div> 
    //   <AdminFooter />
    // </div>
