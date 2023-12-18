
import React, { useState, useEffect } from 'react';
import './feedback_admin.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { fetchMessages } from '../../api'; 
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 


let renderCount = 0;

const MessageList = () => {
  renderCount++;
  console.log(`Component rendered ${renderCount} times`);

  const { data: event, isLoading, isError, error } = useQuery({
    queryKey: ['messages'], 
    queryFn: fetchMessages
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("useEffect is triggered");

    if (event?.event && Array.isArray(event.event)) {
      const initialEvents = event.event.map(message => ({
        ...message,
        isRead: message.is_read === 1,
      }));
      setEvents(initialEvents);
    }
  }, [event]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;

  const handleReadMessage = (messageId) => {
    const updatedEvents = events.map(message =>
      message.reservation_id === messageId ? { ...message, isRead: true } : message
    );
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Header title="反饋列表" showSortIcon={false}/>
      <div className="message-list">
        {events.map((message) => (
          <div
          key={message.reservation_id}
          className={`message-item ${message.isRead ? 'read' : ''}`}
          onClick={() => handleReadMessage(message.reservation_id)}
        >
            <div className="message-content">
                {/* 這裏接問題反饋的api */}
              {/* {<h3>{message.problem}</h3>} */}
            </div>
            <div className="message-bottom"></div> {/* Bottom part */}
          </div>
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default MessageList;