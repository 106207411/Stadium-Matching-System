
import React, { useState, useEffect } from 'react';
//import { useQuery } from 'react-query';
import axios from 'axios'; // or you can use fetch
import './MessageList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import mockMessages from '../../mockData/mockMessage.js';
import { fetchMessages } from '../../api'; 
import { useQuery } from '@tanstack/react-query';


// {"event":
// [{"stadium_id":1,
// "stadium_name":"Taipei Arena",
// "reservation_id":2,
// "title":"YO",
//"is_read":1,
// "message":"The activity is about to start"},
// {"stadium_id":1,
// "stadium_name":"Taipei Arena",
// "reservation_id":1,
// "title":"for testing",
// "is_read":0,
// "message":"The activity is about to start"}
// ]
// }


const MessageList = () => {
  const { data: event, isLoading, isError, error } = useQuery({
    queryKey: ['messages'], 
    queryFn: fetchMessages
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("Event Data:", event);
    
    if (event && Array.isArray(event)) {
      const initialEvents = event.map(message => ({
        ...message,
        isRead: message.is_read === 1,
      }));
      setEvents(initialEvents);
    }
  }, [event]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleReadMessage = (messageId) => {
    const updatedEvents = events.map(message =>
      message.reservation_id === messageId ? { ...message, isRead: true } : message
    );
    setEvents(updatedEvents);
  };


  // [{"stadium_id":1,
// "stadium_name":"Taipei Arena",
// "reservation_id":2,
// "title":"YO",
//"is_read":1,
// "message":"The activity is about to start"},
  return (
    <div>
      <Header title="通知" showSortIcon={false}/>
      <div className="message-list">
        {events.map((message) => (
          <div
          key={message.reservation_id}
          className={`message-item ${message.isRead ? 'read' : ''}`}
          onClick={() => handleReadMessage(message.reservation_id)}
        >
            <div className="message-content">
              <h3>{message.title}</h3>
              <p>預約編號：{message.reservation_id}</p>
              <p>地點：{message.stadium_name}</p>
              <p>訊息：{message.message}</p>
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


// const MessageList = () => {

//   const { data: event, isLoading, isError, error } = useQuery({
//     queryKey: 'messages',
//     queryFn: fetchMessages
//   });
  
  
  

//     const initialEvents = event.map(message => ({
//       ...message,
//       isRead: message.is_read === 1,
//     }));

//     const [events, setEvents] = useState(initialEvents);

//     useEffect(() => {
//       // No need to slice since all messages are already in the state
//     }, [events]);

//     const handleReadMessage = (messageId) => {
//       const updatedEvents = events.map(message =>
//         message.reservation_id === messageId ? { ...message, isRead: true } : message
//       );
//       setEvents(updatedEvents);
//     };

//     return (
//       <div>
//         <Header title="通知" showSortIcon={false}/>
//         <div className="message-list">
//           {messages.map((message) => (
//             <div
//               key={message.reservation_id}
//               className={`message-item ${message.isRead ? 'read' : ''}`}
//               onClick={() => handleReadMessage(message.reservation_id)}
//             >
//               <div className="message-content">
//                 <h3>{message.title}</h3>
//                 <p>預約編號：{message.reservation_id}</p>
//                 <p>地點：{message.stadium_name}</p>
//                 <p>訊息：{message.message}</p>
//               </div>
//               <div className="message-bottom"></div> {/* Bottom part */}
//             </div>
//           ))}
//         </div>
//         <FooterBar />
//       </div>
//     );
// };

// export default MessageList;







// //consider is read

// import React, { useState, useEffect } from 'react';
// import './MessageList.scss';
// import FooterBar from '../../components/FooterBar/FooterBar.jsx';
// import Header from '../../components/Header/Header.jsx';
// import mockMessages from '../../mockData/mockMessage.js'; // Make sure this path is correct

// const MessageList = () => {
//     const [messages, setMessages] = useState([]);
//     const [visibleMessages, setVisibleMessages] = useState([]);
//     const [hasMore, setHasMore] = useState(true);
//     const [readMessageIds, setReadMessageIds] = useState(new Set()); // State to keep track of read messages

//     useEffect(() => {
//       // Load mock data instead of fetching from an API
//       setMessages(mockMessages);
//     }, []);

//     useEffect(() => {
//       // Initial load
//       if (messages.length > 0) {
//         setVisibleMessages(messages.slice(0, 10)); // Initially show 10 messages
//       }
//     }, [messages]);

//     const loadMoreMessages = () => {
//       // Load more messages
//       const currentLength = visibleMessages.length;
//       const newVisibleMessages = messages.slice(
//         currentLength,
//         currentLength + 10 // Load 10 more messages at a time
//       );

//       if (newVisibleMessages.length === 0) {
//         setHasMore(false); // No more messages to load
//       } else {
//         setVisibleMessages([...visibleMessages, ...newVisibleMessages]);
//       }
//     };

//     const handleReadMessage = (messageId) => {
//       setReadMessageIds(new Set(readMessageIds).add(messageId)); // Mark the message as read
//       // In a real app, you would also update the backend here
//     };


//     // stadium_id: int,
//     // activity_id: int
//     // stadium_name: string,
//     // titile: string,
//     // is_read: int,
//     // message : string


//     return (
//       <div>
//         <Header title="通知" />
//         <div className="message-list">
//           {visibleMessages.map((message) => (
//             <div
//               key={message.id}
//               className={`message-item ${readMessageIds.has(message.id) ? 'read' : ''}`}
//               onClick={() => handleReadMessage(message.id)}
//             >
//               <div className="message-content">
//                 <h3>{message.title}</h3>
//                 <p>{message.date}</p>
//                 <p>{message.detail}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <FooterBar />
//       </div>
//     );
// };

// export default MessageList;










/* 1st version no read consideration

import React, { useState, useEffect } from 'react';
import './MessageList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import mockMessages from '../../mockData/mockMessage.js'; // You will need to create this mock data file

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      // Load mock data instead of fetching from an API
      setMessages(mockMessages);
    }, []);
  
    useEffect(() => {
      // Initial load
      if (messages.length > 0) {
        setVisibleMessages(messages.slice(0, 10)); // Initially show 10 messages
      }
    }, [messages]);
  
    const loadMoreMessages = () => {
      // Load more messages
      const currentLength = visibleMessages.length;
      const newVisibleMessages = messages.slice(
        currentLength,
        currentLength + 10 // Load 10 more messages at a time
      );
  
      if (newVisibleMessages.length === 0) {
        setHasMore(false); // No more messages to load
      } else {
        setVisibleMessages([...visibleMessages, ...newVisibleMessages]);
      }
    };

  return (
    <div>
      <Header title="通知" />
      <div className="message-list">
        {visibleMessages.map((message) => (
          <div key={message.id} className="message-item">
            <div className="message-content">
              <h3>{message.title}</h3>
              <p>{message.date}</p>
              <p>{message.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default MessageList;
*/