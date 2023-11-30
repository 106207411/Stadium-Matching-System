import React from 'react';
import mockMyActivity from '../../mockData/mockMyActivities.js';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useNavigate } from 'react-router-dom';


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

    return (
        <div>
            <Header title="我的清單" />
            <div className="activity-list">
                <div>
                    {mockMyActivity.map((activity) => (
                        <div key={activity.id} className="activity-item" onClick={() => handleActivityClick(activity.id)}>
                            <img src={activity.image} alt={activity.title} />
                            <div className="activity-info">
                                <div className="title-time">
                                    <h3>{activity.title}</h3>
                                    <span className="time">{activity.date}</span>
                                </div>
                                <div className="stadium-price">
                                    <p>{activity.location} - {activity.fee}</p>
                                    <div className="rating">{generateStars(activity.rating)}</div>
                                </div>
                                <span className="remaining">活動參與：{activity.peoples}/{activity.max}人</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FooterBar />
        </div>
    );
};

export default MyActivityList;


//<ActivityInfo key={activity.id} activity={activity} />
