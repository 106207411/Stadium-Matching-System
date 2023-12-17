import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FooterBar.scss'

// Due to our footer will unmount and mount every time
// the user clicks on the tab, we need to use localStorage
// to keep track of the active tab.
// Traditional useState with useEffect can not work in this case.

const Footer = () => {
  const navigate = useNavigate();
  // Retrieve the active tab from localStorage or default to 'home'
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'home');

  // Update the activeTab state when it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setActiveTab(localStorage.getItem('activeTab'));
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navigateAndHighlight = (path, icon) => {
    // Update local storage and state
    localStorage.setItem('activeTab', icon);
    setActiveTab(icon);
    // Navigate to the new path
    navigate(path);
  };

  // Function to dynamically determine the class for the icon
  const getIconClass = (icon) => {
    return `footer-icon ${activeTab === icon ? 'highlighted' : ''}`;
  };

  return (
    <footer className="footer">
      <div className={getIconClass('mail')}
        onClick={() => navigateAndHighlight('/message/list', 'mail')}>
        <img src="/mail.png" alt="Mail" />
      </div>
      <div className={getIconClass('list')}
        onClick={() => navigateAndHighlight('/activity/mylist', 'list')}>
        <img src="/list.png" alt="List" />
      </div>
      <div className={getIconClass('home')}
        onClick={() => navigateAndHighlight('/home', 'home')}>
        <img src="/home.png" alt="Home" />
      </div>
      <div className={getIconClass('favorites')}
        onClick={() => navigateAndHighlight('/like/list', 'favorites')}>
        <img src="/heart.png" alt="Favorites" />
      </div>
      <div className={getIconClass('profile')}
        onClick={() => navigateAndHighlight('/profile', 'profile')}>
        <img src="/profile.png" alt="Profile" />
      </div>
    </footer>
  );
};

export default Footer;