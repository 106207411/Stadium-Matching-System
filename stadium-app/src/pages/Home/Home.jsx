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
import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '../../api';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const { logoutHandler } = useAuth();


  const [age, setAge] = useState('');

  // const { data: activitiesData, isLoading, isError, error } = useQuery({
  //   queryKey: ['activities'],
  //   queryFn: fetchActivities
  // });


  const { data: activitiesData, isLoading, isError, error } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities
  });

  console.log('Activities data home:', activitiesData);

  const activities = activitiesData?.activity;

  const generateStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className="star" />);
    }
    return stars;
  };

  const timeRangeMapping = (timeNumber) => {
    const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
    const endHour = startHour + 1;
    return `${startHour} - ${endHour}`;
  };




  const sports = ['tennis', 'tabletennis', 'badminton', 'basketball', 'volley', 'baseball', 'gym', 'swimming'];
  //const activities = ['b1', 'b2'];

  const navigate = useNavigate();


  const handleHomeActivityClick = (activityId) => {
    navigate(`/activity/${activityId}`);
  };

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

          <div className="home-activity-container">
            <div className="title-container">
              <div className="title-left">活動</div>
              <div className="title-right">
                <span onClick={gotoActivity} style={{ cursor: 'pointer' }}>更多</span>
              </div>
            </div>

            <div className="home-activity-section">



              {activities?.map((activity) => (
                <div key={activity.id} className="home-activity-item" onClick={() => handleHomeActivityClick(activity.id)}>
                  <img src={activity.picture} alt={activity.title} />
                  <div className="home-activity-info">
                    <div className="home-title-time">
                      <h3>{activity.title}</h3>
                      <span className="time">{activity.date} {timeRangeMapping(activity.time)}</span>
                    </div>
                    <div className="stadium-price">
                      <p>{activity.name} - {activity.price}/人</p>
                      <div className="rating">{generateStars(activity.level)}</div>
                    </div>
                    <span className="remaining">剩餘 {activity.remain} 人</span>
                  </div>
                </div>
              ))}
            </div>

{/* 
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
            </div> */}




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
