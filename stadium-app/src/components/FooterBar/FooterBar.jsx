import React from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { MdVolumeUp, MdViewList } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import './FooterBar.scss';
import { fetchMessages } from '../../api'; 
import { useQuery } from '@tanstack/react-query';

const Footer = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const unreadMessagesCount = data.event.filter(msg => msg.is_read === 0).length;

  return (
    <footer className="footer">
      <NavLink to="/message/list" className="footer-icon" activeClassName="active">
        <MdVolumeUp className="icon" />
             {unreadMessagesCount > 0 ? (
  <span className="unread-count">{unreadMessagesCount}</span>
 ) : null} 
      </NavLink>

      <NavLink to="/activity/mylist" className="footer-icon" activeClassName="active">
        <MdViewList className="icon" />
      </NavLink>

      <NavLink to="/home" className="footer-icon" activeClassName="active">
      <IoHomeSharp className="home-icon" style={{ fontSize: '42px', backgroundColor: '#D9D9D9', borderRadius: '50%', padding: '10px' }} />
      </NavLink>

      

      <NavLink to="/like/list" className="footer-icon" activeClassName="active">
        <AiFillHeart className="icon" />
      </NavLink>

      <NavLink to="/profile" className="footer-icon" activeClassName="active">
        <CgProfile className="icon" />
      </NavLink>
    </footer>
  );
};

export default Footer;

//version highlight
// import { React, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { IoHomeSharp } from "react-icons/io5";
// import { MdVolumeUp, MdViewList } from 'react-icons/md';
// import { AiFillHeart } from 'react-icons/ai';
// import { CgProfile } from 'react-icons/cg';
// import './FooterBar.scss'
// import { fetchMessages } from '../../api'; 
// import { useQuery } from '@tanstack/react-query';


// const Footer = () =>  {
  
  
//   const navigate = useNavigate();
//   // Retrieve the active tab from localStorage or default to 'home'
//   const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'home');


//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['messages'],
//     queryFn: fetchMessages
//   });


//   if (isLoading) return <div>Loading...</div>; // 或者你的LoadingSpinner組件
//   if (isError) return <div>Error: {error.message}</div>;

//   const unreadMessagesCount = data.event.filter(msg => msg.is_read === 0).length;

//   // Update the activeTab state when it changes in localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setActiveTab(localStorage.getItem('activeTab'));
//     };

//     // Listen for changes to localStorage
//     window.addEventListener('storage', handleStorageChange);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const navigateAndHighlight = (path, icon) => {
//     // Update local storage and state
//     localStorage.setItem('activeTab', icon);
//    // setActiveTab(icon);
//     // Navigate to the new path
//     navigate(path);
//   };

//   // Function to dynamically determine the class for the icon
//   const getIconClass = (icon) => {
//     return `footer-icon ${activeTab === icon ? 'highlighted' : ''}`;
//   };

//   return (
//     <footer className="footer">

// <div className={getIconClass('mail')} onClick={() => navigateAndHighlight('/message/list', 'mail')}>
//         <MdVolumeUp className="icon" />
//         {unreadMessagesCount > 0 ? (
//   <span className="unread-count">{unreadMessagesCount}</span>
// ) : null}
//       </div>


//       <div className={getIconClass('list')}
//        onClick={() => navigateAndHighlight('/activity/mylist', 'list')}>
//     <MdViewList className="icon" />
//   </div>


//       <div className={getIconClass('home')}
//       onClick={() => navigateAndHighlight('/home', 'home')}>
//       <IoHomeSharp className="home-icon" />
//     </div>

//     <div className={getIconClass('favorites')}
//        onClick={() => navigateAndHighlight('/like/list', 'favorites')}>
//     <AiFillHeart className="icon" />
//   </div>

//       <div className={getIconClass('profile')}
//        onClick={() => navigateAndHighlight('/profile', 'profile')}>
//     <CgProfile className="icon" />
//   </div>
//     </footer>
//   );
// };

// export default Footer;








//original version

// import { React, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { IoHomeSharp } from "react-icons/io5";

// import './FooterBar.scss'

// // Due to our footer will unmount and mount every time
// // the user clicks on the tab, we need to use localStorage
// // to keep track of the active tab.
// // Traditional useState with useEffect can not work in this case.

// const Footer = () => {
//   const navigate = useNavigate();
//   // Retrieve the active tab from localStorage or default to 'home'
//   const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'home');

//   // Update the activeTab state when it changes in localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setActiveTab(localStorage.getItem('activeTab'));
//     };

//     // Listen for changes to localStorage
//     window.addEventListener('storage', handleStorageChange);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const navigateAndHighlight = (path, icon) => {
//     // Update local storage and state
//     localStorage.setItem('activeTab', icon);
//     setActiveTab(icon);
//     // Navigate to the new path
//     navigate(path);
//   };

//   // Function to dynamically determine the class for the icon
//   const getIconClass = (icon) => {
//     return `footer-icon ${activeTab === icon ? 'highlighted' : ''}`;
//   };

//   return (
//     <footer className="footer">
//       <div className={getIconClass('mail')}
//         onClick={() => navigateAndHighlight('/message/list', 'mail')}>
//         <img src="/mail.png" alt="Mail" />
//       </div>
//       <div className={getIconClass('list')}
//         onClick={() => navigateAndHighlight('/activity/mylist', 'list')}>
//         <img src="/list.png" alt="List" />
//       </div>
//       <div className={getIconClass('home')}
//         onClick={() => navigateAndHighlight('/home', 'home')}>
//         <img src="/home.png" alt="Home" />
//       </div>
//       <div className={getIconClass('favorites')}
//         onClick={() => navigateAndHighlight('/like/list', 'favorites')}>
//         <img src="/heart.png" alt="Favorites" />
//       </div>
//       <div className={getIconClass('profile')}
//         onClick={() => navigateAndHighlight('/profile', 'profile')}>
//         <img src="/profile.png" alt="Profile" />
//       </div>
//     </footer>
//   );
// };

// export default Footer;