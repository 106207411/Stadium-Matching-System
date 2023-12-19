
import React, { useState, useEffect } from 'react';
import './feedback_admin.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import AdminFooter from '../../components/FooterBar/AdminFooter.jsx';
import Header from '../../components/Header/Header.jsx';
import { fetchFeedback } from '../../api'; 
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Loading/LoadingPage';
import axios from 'axios';
import { PROD_API_URL, API_URL } from '../../config/config';

let renderCount = 0;

const FeedbackList = () => {
  const { data: feedback, isLoading, isError, error } = useQuery({
    queryKey: ['feedback'], 
    queryFn: fetchFeedback
  });

  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    console.log("useEffect is triggered in feedback list");
    console.log(feedback)

    if (feedback?.feedback && Array.isArray(feedback.feedback)) {
      const initialFeedback = feedback.feedback.map(feedback => ({
        ...feedback,
        isRead: feedback.read === 1,
      }));
      setFeedbackList(initialFeedback);
    }
  }, [feedback]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const markFeedbackAsRead = async (feedbackId) => {
    try {
      const response = await axios.put(
        `${PROD_API_URL}/admin/feedback/${feedbackId}/read`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error making feedback as read:', error);
      throw error;
    }
  };

  const handleReadFeedback = async (feedbackId) => {
    try {
      await markFeedbackAsRead(feedbackId)
      const updatedFeedbacks = feedbackList.map(feedback =>
        feedback.feedback_id === feedbackId ? { ...feedback, isRead: true } : feedback
      );
      setFeedbackList(updatedFeedbacks);
    } catch (error) {
      
    }
  };

  return (
    <div>
      <Header title="球場問題" showSortIcon={false}/>
      <div className="message-list">
        {feedbackList.map((feedback) => (
          <div
          key={feedback.feedback_id}
          className={`message-item ${feedback.read ? 'read' : ''}`}
          onClick={() => handleReadFeedback(feedback.feedback_id)}
        >
            <div className="message-content">
              <h3>{feedback.name}</h3>
              <p>{feedback.suggestion}</p>
            </div>
            <div className="message-bottom"></div>
          </div>
        ))}
      </div>
      <AdminFooter />
    </div>
  );
};

export default FeedbackList;