import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import './Home.scss';
import FooterBar from "../../components/FooterBar/FooterBar";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { ToastContainer } from 'react-toastify';
import MapView from '../../components/Map/MapView';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Home = () => {
  const { logoutHandler } = useAuth();

  const [age, setAge] = useState('');
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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSearchIconClick = () => {
    const exampleId = '123';
    navigate(`/activity/${exampleId}`);
  };

  return (
    <div className="home-container">
      <div className="button-container" onClick={logoutHandler}>
        <PiSignOutBold />
      </div>

      <div className="search-bar">
        <input type="search" placeholder="Search for activities..." />
        <GoSearch className="search-icon" onClick={handleSearchIconClick} />
      </div>

      {selectedOption === 'List' ? (
        <></>
      ) : (
        // <Box sx={{ minWidth: 120 }}>
        //   <FormControl fullWidth>
        //     <InputLabel id="demo-simple-select-label">Age</InputLabel>
        //     <Select
        //       labelId="demo-simple-select-label"
        //       id="demo-simple-select"
        //       value={age}
        //       label="Age"
        //       onChange={handleChange}
        //     >
        //       <MenuItem value={10}>Ten</MenuItem>
        //       <MenuItem value={20}>Twenty</MenuItem>
        //       <MenuItem value={30}>Thirty</MenuItem>
        //     </Select>
        //   </FormControl>
        // </Box>
        <></>
      )}
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

          <div className="activity-container">
            <div className="title-container">
              <div className="title-left">活動</div>
              <div className="title-right">
                <span onClick={gotoActivity} style={{ cursor: 'pointer' }}>更多</span>
              </div>
            </div>
            <div className="activity-section">
              {activities.map(activity => (
                <div key={activity} className="activity">
                  <img src={`/${activity}.jpg`} alt={activity} />
                </div>
              ))}
            </div>
          </div>

        </>
      ) : (
        <>
          <MapView />
        </>
      )}
      <FooterBar />
    </div>
  );
};

export default Home;
