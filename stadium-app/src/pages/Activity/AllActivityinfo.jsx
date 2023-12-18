import React, { useState } from 'react';
import './AllActivityinfo.scss';
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


const AllActivityInfo = () => {

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

    const [hasJoined, setHasJoined] = useState(false);

    const openConfirmationModal = () => setIsConfirmationModalOpen(true);
    const closeConfirmationModal = () => setIsConfirmationModalOpen(false);


    const handleJoinActivity = async () => {
        try {
            const response = await axios.post(`${PROD_API_URL}/activity/join/${activityId}`, {}, {
                withCredentials: true,
            });

            console.log('Join activity success:', response.data);
            queryClient.invalidateQueries(['activityinfo', activityId]);
            navigate(`/activity/mylist/${activityId}`, { replace: true });

        } catch (error) {
            console.error('Error joining activity:', error);
            // Optionally handle error in the UI
        }
    };

    if (hasJoined) {
        // 重定向或渲染不同的組件
        return <Redirect to={`/activity/mylist/${activityId}`} />;
    }

    const handleConfirm = () => {
        handleJoinActivity();
        closeConfirmationModal();
    };

    //:/api/activity/:activity_id

    //useParams get :activity_id



    // const selectedActivity = mockMyActivity.find((activity) => activity.id === activity_id);
    // console.log(selectedActivity)
    // if (!selectedActivity) {

    //     return <div>not found</div>;
    // }

    const selectedActivity = activityData;

    console.log('data:', selectedActivity)


    const handleReportIssue = () => {
        navigate('/report-issue'); // Navigate to the report issue page
    };

    const generateStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src="../../star.png" alt="Star" className="all-star" />);
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
            <Header title="活動詳情" showSortIcon={false} />
            <div className="all-activity-card">

                <h1 className="all-activity-title">{selectedActivity.title}</h1>
                <img src={selectedActivity.stadium.picture} alt={selectedActivity.title} className="all-activity-image" />
                <div className="all-activity-details">
                    <p>ID:{selectedActivity.id}</p>

                    <div className="all-location-container">
                        <p>場地：{selectedActivity.stadium.name}</p>
                        <span className="all-report-issue" onClick={handleReportIssue}>
                            <LuAlertCircle className="all-report-icon" />
                            問題回報
                        </span>
                    </div>


                    <p>時間：{selectedActivity.date} [ {timeRangeMapping(selectedActivity.time)} ]</p>
                    <p>收費：{selectedActivity.fee} / 人</p>
                    <p>程度：{generateStars(selectedActivity.level)}</p>

                    <div className="all-participant-container">
                        <p>活動參與：{selectedActivity.people}/{selectedActivity.max}人</p>
                        <span className="all-participant" onClick={openModal}>
                            <VscAccount className="all-participant-icon" />
                            參與者
                        </span>
                    </div>

                    {isModalOpen && (
                        <ParticipantModal users={selectedActivity.users} onClose={closeModal} />
                    )}
                </div>
                <img src={selectedActivity.creator.picture} alt="Avatar" className="all-user-avatar" />
                <button className="all-join-button" onClick={openConfirmationModal}>申請加入</button>

                {isConfirmationModalOpen && (
                    <ConfirmModal onConfirm={handleConfirm} onCancel={closeConfirmationModal} />
                )}
            </div>
            <FooterBar />
        </div>

    );
};

export default AllActivityInfo;

