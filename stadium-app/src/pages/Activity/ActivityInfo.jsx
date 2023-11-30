import React from 'react';
import './ActivityInfo.scss';
import mockMyActivity from '../../mockData/mockMyActivities.js'; 
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import { useParams } from 'react-router-dom';

const ActivityInfo = () => {


    //:/api/activity/:activity_id

 //useParams get :activity_id
  const { activity_id } = useParams();
  

  const selectedActivity = mockMyActivity.find((activity) => activity.id === activity_id);
  console.log(selectedActivity)
  if (!selectedActivity) {

    return <div>not found</div>;
  }
    
  return (
    <div>
      <Header title="我的活動" />
      <div className="activity-card">
        <h1 className="activity-title">{selectedActivity.title}</h1>
        <img src={selectedActivity.image} alt={selectedActivity.title} className="activity-image" />
        <div className="activity-details">
          <p>ID:{selectedActivity.id}</p>
          <p>場地：{selectedActivity.location}</p>
          <p>時間：{selectedActivity.date}</p>
          <p>收費：{selectedActivity.fee} / 時</p>
          <p>程度：{selectedActivity.level}</p>
          <p>活動參與：{selectedActivity.participants}</p>
        </div>
          <img src={selectedActivity.avatar} alt="Avatar" className="user-avatar" />
          <button className="join-button">退出活動</button>

      </div>
      <FooterBar />
    </div>
  );
};
  
  export default ActivityInfo;
