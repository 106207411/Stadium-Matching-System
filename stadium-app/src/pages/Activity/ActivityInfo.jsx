import React, { useState } from 'react';
import './ActivityInfo.scss';
import mockMyActivity from '../../mockData/mockMyActivities.js';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { LuAlertCircle } from "react-icons/lu";
import ParticipantModal from '../../components/ParticipantModal';
import { VscAccount } from "react-icons/vsc";
import { fetchMyActivityInfo } from '../../api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Loading/LoadingPage';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import axios from 'axios';
import { PROD_API_URL, API_URL } from '../../config/config'


const ActivityInfo = () => {

    const { activity_id } = useParams();
    console.log('id is', activity_id);

    const queryClient = useQueryClient();
    const activityId = useParams().activity_id;
    const navigate = useNavigate();


    const { data: activityData, isLoading, isError, error } = useQuery({
        queryKey: ['activityinfo', activity_id],
        queryFn: () => fetchMyActivityInfo(activity_id),
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);


    const openConfirmationModal = () => setIsConfirmationModalOpen(true);
    const closeConfirmationModal = () => setIsConfirmationModalOpen(false);


    const selectedActivity = activityData;

    //console.log('data:', selectedActivity)


    const handleLeaveActivity = async () => {
        try {
            console.log('delete url', `${PROD_API_URL}/activity/leave/${activityId}`);
            const response = await axios.delete(`${PROD_API_URL}/activity/leave/${activityId}`, {
                withCredentials: true,
            });
            console.log('Leave activity success:', response.data);
            // 成功退出活動後導向到我的其他活動清單
            navigate('/activity/mylist', { replace: true });

        } catch (error) {
            console.error('Error leaving activity:', error);
            // 錯誤處理
        }
    };

    const handleConfirmLeave = () => {
        handleLeaveActivity();
        closeConfirmationModal(); // 假設您已經創建了一個關閉確認模態框的函數
    };


    const handleReportIssue = () => {
        localStorage.setItem('stadiumId', selectedActivity.stadium.id);
        navigate('/report-issue'); // Navigate to the report issue page
    };

    const generateStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../../star.png" alt="Star" className="star" />);
        }
        return stars;
    };



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const timeRangeMapping = (timeNumber) => {
        const startHour = 8 + timeNumber; // Assuming 1 corresponds to 9-10
        const endHour = startHour + 1;
        return `${startHour} - ${endHour}`;
    };



    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: {error.message}</div>;



    return (
        <div>
            <Header title="我的活動" showSortIcon={false} />
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
                <button className="leave-button" onClick={openConfirmationModal}>退出活動</button>

                {isConfirmationModalOpen && (
                    <ConfirmModal onConfirm={handleConfirmLeave} onCancel={closeConfirmationModal} title="確認退出活動？" />
                )}

            </div>
            <FooterBar />
        </div>

    );
};

export default ActivityInfo;


// <p>活動參與：{selectedActivity.people}/{selectedActivity.max}人</p>

