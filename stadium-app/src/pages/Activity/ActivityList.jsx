import React, { useState, useEffect } from 'react';
import './ActivityList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '../../api';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 
import { FaStar } from 'react-icons/fa';

const ActivityList = () => {

  const { data: activitiesData, isLoading, isError, error } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities
  });

  console.log('Activities data:', activitiesData);


  const generateStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className="star" />);
    }
    return stars;
  };



  if (isLoading) {
    return (
        <div>
            <Header title="活動" showSortIcon={false}/>
            <LoadingSpinner />;
            <FooterBar />
        </div>
    )
}
 

  if (isError) return <div>Error: {error.message}</div>;


  const navigate = useNavigate();

  const handleAllActivityClick = (activityId) => {
    navigate(`/activity/${activityId}`);
};

  const activities = activitiesData?.activity;

  const timeRangeMapping = (timeNumber) => {
    const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
    const endHour = startHour + 1;
    return `${startHour} - ${endHour}`;
};



  return (
    <div>
      <Header title="活動" showSortIcon={true}/>
      <div className="activity-list">
          {activities?.map((activity) => (
            <div key={activity.id} className="activity-item" onClick={() => handleAllActivityClick(activity.id)}>
              <img src={activity.picture} alt={activity.title} />
              <div className="activity-info">
                <div className="title-time">
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
      <FooterBar />
    </div>
  );
};

export default ActivityList;



