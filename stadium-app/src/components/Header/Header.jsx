// import { useState, useEffect } from "react"
import React from 'react';
import './Header.scss'; 
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const Header = ({ title, showSortIcon }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div className="header-icon" onClick={goBack}>
        <FaArrowLeft size={32}/>
      </div>
      <h1 className="header-title">{title}</h1>
      { showSortIcon ? (
        <div className="header-icon right">
          <img src="/updown.png" alt="Up and Down" />
        </div>
      ) : (
        // Empty div to avoid wrong layout due to CSS
        <div className='header-icon right'></div>
      )}
      
    </header>
  );
};

export default Header;
