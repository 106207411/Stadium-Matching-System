// import { useState, useEffect } from "react"
import React from 'react';
import './AdminHeader.scss'; 
import { useNavigate } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ title, showBackIcon }) => {
  const navigate = useNavigate();
  const { logoutHandler } = useAuth();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="auth-header">
      { showBackIcon ? (
        <div className="auth-header-icon left" onClick={goBack}>
          <FaArrowLeft size={64}/>
        </div>
      ) : (
        // Empty div to avoid wrong layout due to CSS
        <div className="auth-header-icon left"></div>
      )}
      <h1 className="auth-header-title">{title}</h1>
      <div className="auth-header-icon right" onClick={logoutHandler}>
        <PiSignOutBold />
      </div>
    </header>
  );
};

export default AdminHeader;
