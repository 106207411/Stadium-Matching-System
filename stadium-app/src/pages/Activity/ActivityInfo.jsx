import React from 'react';
import './ActivityInfo.scss';
import mockMyActivity from '../../mockData/mockMyActivities.js';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useParams } from 'react-router-dom';
import { LuAlertCircle } from "react-icons/lu";

const ActivityInfo = () => {


    //:/api/activity/:activity_id

    //useParams get :activity_id
    const { activity_id } = useParams();


    const selectedActivity = mockMyActivity.find((activity) => activity.id === activity_id);
    console.log(selectedActivity)
    if (!selectedActivity) {

        return <div>not found</div>;
    }

    const handleReportIssue = () => {
        navigate('/report-issue'); // Navigate to the report issue page
    };

    const generateStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../../star.png" alt="Star" className="star" />);
        }
        return stars;
    };

    return (
        <div>
            <Header title="我的活動" />
            <div className="activity-card">

                <h1 className="activity-title">{selectedActivity.title}</h1>
                <img src={selectedActivity.image} alt={selectedActivity.title} className="activity-image" />
                <div className="activity-details">
                    <p>ID:{selectedActivity.id}</p><div className="location-container">
                        <p>場地：{selectedActivity.location}</p>
                        <span className="report-issue" onClick={handleReportIssue}>
                            <LuAlertCircle className="report-icon" />
                            問題回報
                        </span>
                    </div>
                    <p>時間：{selectedActivity.date}</p>
                    <p>收費：{selectedActivity.fee} / 時</p>
                    <p>程度：{generateStars(selectedActivity.rating)}</p>
                    <p>活動參與：{selectedActivity.peoples}/{selectedActivity.max}人</p>
                </div>
                <img src={selectedActivity.avatar} alt="Avatar" className="user-avatar" />
                <button className="join-button">退出活動</button>

            </div>
            <FooterBar />
        </div>
    );
};

export default ActivityInfo;
