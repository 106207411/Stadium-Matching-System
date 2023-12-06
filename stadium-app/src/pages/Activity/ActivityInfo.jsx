import React, { useState } from 'react';
import './ActivityInfo.scss';
import mockMyActivity from '../../mockData/mockMyActivities.js';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { LuAlertCircle } from "react-icons/lu";
import ParticipantModal from '../../components/ParticipantModal';
import { VscAccount } from "react-icons/vsc";

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const timeRangeMapping = (timeNumber) => {
        const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
        const endHour = startHour + 1;
        return `${startHour} - ${endHour}`;
    };


    return (
        <div>
            <Header title="我的活動" showSortIcon={false}/>
            <div className="activity-card">

                <h1 className="activity-title">{selectedActivity.title}</h1>
                <img src={selectedActivity.stadium.picture} alt={selectedActivity.title} className="activity-image" />
                <div className="activity-details">
                    <p>ID:{selectedActivity.id}</p>

                    <div className="location-container">
                        <p>場地：{selectedActivity.stadium.name}</p>
                        <span className="report-issue" onClick={handleReportIssue}>
                            <LuAlertCircle className="report-icon" />
                            問題回報
                        </span>
                    </div>


                    <p>時間：{selectedActivity.date} [ {timeRangeMapping(selectedActivity.time)} ]</p>
                    <p>收費：{selectedActivity.fee} / 人</p>
                    <p>程度：{generateStars(selectedActivity.level)}</p>

                    <div className="participant-container">
                        <p>活動參與：{selectedActivity.people}/{selectedActivity.max}人</p>
                        <span className="participant" onClick={openModal}>
                            <VscAccount className="participant-icon" />
                            參與者
                        </span>
                    </div>

                    {isModalOpen && (
                        <ParticipantModal users={selectedActivity.users} onClose={closeModal} />
                    )}
                </div>
                <img src={selectedActivity.creator.picture} alt="Avatar" className="user-avatar" />
                <button className="join-button">退出活動</button>

            </div>
            <FooterBar />
        </div>

    );
};

export default ActivityInfo;


// <p>活動參與：{selectedActivity.people}/{selectedActivity.max}人</p>

