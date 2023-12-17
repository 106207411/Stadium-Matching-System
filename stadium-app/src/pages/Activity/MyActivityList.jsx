import React,{useState} from 'react';
import mockMyActivity from '../../mockData/mockMyActivities.js';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 
import './MyActivityList.scss';



const MyActivityList = () => {

    const navigate = useNavigate();
    const handleActivityClick = (activityId) => {
        navigate(`/activity/mylist/${activityId}`);
    };

    const generateStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../star.png" alt="Star" className="star" />);
        }
        return stars;
    };

    const timeRangeMapping = (timeNumber) => {
        const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
        const endHour = startHour + 1;
        return `${startHour} - ${endHour}`;
    };
    
    const [selectedOption, setSelectedOption] = useState('Pending'); // 預設選List


    const toggleOption = (option) => {
      setSelectedOption(option);
    };


    return (
        <div>
            <Header title="我的清單" showSortIcon={false}/>


            <div className="my-activity-options-container">
        <div className="my-activity-options-section">

          <button
            className={`option ${selectedOption === 'Pending' ? 'active' : ''}`}
            onClick={() => toggleOption('Pending')}>
            預約中
          </button>
          <button
            className={`option ${selectedOption === '已完成' ? 'active' : ''}`}
            onClick={() => toggleOption('已完成')}>
            已完成
          </button>
        </div>
      </div>
      
      {selectedOption === 'Pending' ? (

    <>
            <div className="my-activity-list">
                <div>
                    {mockMyActivity.map((activity) => (
                        <div key={activity.id} className="my-activity-item" onClick={() => handleActivityClick(activity.id)}>
                            <img src={activity.stadium.picture} alt={activity.title} />
                            <div className="my-activity-info">
                                <div className="title-time">
                                    <h3>{activity.title}</h3>
                                    <span className="time">{activity.date} {timeRangeMapping(activity.time)}</span>
                                </div>
                                <div className="stadium-price">
                                    <p>{activity.stadium.name} - {activity.fee}/人</p>
                                    <div className="rating">{generateStars(activity.level)}</div>
                                </div>
                                <span className="remaining">活動參與：{activity.people}/{activity.max}人</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

  </>
  ) : (
    <>

<div className="finish-container">
            <div style={{ textAlign: 'center' }}>
              to be continued...
            </div>
          </div>
        </>
      )}

            <FooterBar />
        </div>
    );
};

export default MyActivityList;


//<ActivityInfo key={activity.id} activity={activity} />
