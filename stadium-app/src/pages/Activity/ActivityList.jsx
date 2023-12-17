import React, { useState, useEffect } from 'react';
import './ActivityList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import mockActivities from '../../mockData/mockActivities.js'; 
import { useQuery } from '@tanstack/react-query';
import { fetchActivities } from '../../api';
import InfiniteScroll from 'react-infinite-scroll-component'; // Make sure to install this package

const ActivityList = () => {
  // const [activities, setActivities] = useState([]);
  // const [visibleActivities, setVisibleActivities] = useState([]);
  // const [hasMore, setHasMore] = useState(true);

  const { data: activitiesData, isLoading, isError, error } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities
  });

  console.log('Activities data:', activitiesData);


  // useEffect(() => {
  //   // Load mock data instead of fetching from an API
  //   setActivities(mockActivities);
  // }, []);

  // useEffect(() => {
  //   // Initial load
  //   if (activities.length > 0) {
  //     setVisibleActivities(activities.slice(0, 10)); // 初始顯示10個活動
  //   }
  // }, [activities]);

  // const loadMoreActivities = () => {
  //   // 載入更多活動
  //   const currentLength = visibleActivities.length;
  //   const newVisibleActivities = activities.slice(
  //     currentLength,
  //     currentLength + 10 // 每次載入10個活動
  //   );

  //   if (newVisibleActivities.length === 0) {
  //     setHasMore(false); // 沒有更多活動可載入
  //   } else {
  //     setVisibleActivities([...visibleActivities, ...newVisibleActivities]);
  //   }
  // };

  // Function to generate star ratings
const generateStars = (rating) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<img key={i} src="../star.png" alt="Star" className="star" />);
  }
  return stars;
};


if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  const activitiesArray = Array.isArray(activitiesData) ? activitiesData : activitiesData?.activities;

  // Check if activitiesArray is not undefined and is an array
  // if (!Array.isArray(activitiesArray)) {
  //   console.error('activitiesData is not an array:', activitiesData);
  //   return <div>Error: Data is not an array</div>;
  // }

  const activities = activitiesData?.activity;


  return (
    <div>
      <Header title="活動" showSortIcon={true}/>
      <div className="activity-list">
        {/* <InfiniteScroll
          dataLength={visibleActivities.length}
          next={loadMoreActivities}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        > */}
          {activities?.map((activity) => (
            <div key={activity.id} className="activity-item">
              <img src={activity.picture} alt={activity.title} />
              <div className="activity-info">
                <div className="title-time">
                  <h3>{activity.title}</h3>
                  <span className="time">{activity.time}</span>
                </div>
                <div className="stadium-price">
                  <p>{activity.name} - {activity.price}/人</p>
                  <div className="rating">{generateStars(activity.level)}</div>
                </div>
                <span className="remaining">剩餘 {activity.remain} 人</span>
              </div>
            </div>
          ))}
        {/* </InfiniteScroll> */}
      </div>
      <FooterBar />
    </div>
  );
};

export default ActivityList;



