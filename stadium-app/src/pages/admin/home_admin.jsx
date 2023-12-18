import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import './home_admin.scss';
import FooterBar from "../../components/FooterBar/FooterBar";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Home_admin = () => {
  const { logout } = useAuth();

  const sports = ['tennis', 'tabletennis', 'badminton', 'basketball', 'volley', 'baseball', 'gym', 'swimming'];
  const activities = ['b1', 'b2'];

  const navigate = useNavigate();

  const gotoStadium = () => {
    navigate('/stadium/list');
  };

  const gotoActivity = () => {
    navigate('/activity/list');
  };

  const [selectedOption, setSelectedOption] = useState('List'); // 預設選List


  const toggleOption = (option) => {
    setSelectedOption(option);
  };

  const handleSearchIconClick = () => {
    const exampleId = '123';
    navigate(`/activity/${exampleId}`);
  };

  return (
    <div className="home-container">
      <div className="button-container" onClick={logout}>
        <PiSignOutBold />
      </div>

      <div className="search-bar">
        <input type="search" placeholder="Search for activities..." />
        <GoSearch className="search-icon" onClick={handleSearchIconClick} />
      </div>

      <div className="options-container">
        <div className="options-section">

          <button
            className={`option ${selectedOption === 'List' ? 'active' : ''}`}
            onClick={() => toggleOption('List')}>
            List
          </button>
          <button
            className={`option ${selectedOption === 'Map' ? 'active' : ''}`}
            onClick={() => toggleOption('Map')}>
            Map
          </button>
        </div>
      </div>
      {selectedOption === 'List' ? (
        <>
          <div className="sports-container">
            <div className="title-container">
              <div className="title-left">場地</div>
              <div className="title-right">
                <span onClick={gotoStadium} style={{ cursor: 'pointer' }}>更多</span>
              </div>
            </div>
            <div className="sports-section">
              {sports.map(sport => (
                <div key={sport} className="sport">
                  <img src={`/${sport}.png`} alt={sport} />
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="map-container">
            <div style={{ textAlign: 'center' }}>
              to be continued...
            </div>
          </div>
        </>
      )}
    <div className='addstadium'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Button variant="contained" onClick={() => navigate('../admin/add')}>上架场地</Button>
      </div>
    </div> 
    <div className='feedback'>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: "30px",
      }}>
        <Button variant="contained" onClick={() => navigate('../admin/feedback')}>反饋列表</Button>
      </div>
    </div> 
      <FooterBar />
    </div>
  );
};

export default Home_admin;