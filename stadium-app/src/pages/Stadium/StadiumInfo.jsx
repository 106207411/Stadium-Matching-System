import React from 'react';
import './StadiumInfo.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";

const StadiumInfo = () => {
  const handleConfirmReservation = () => {
    // 在這裡處理確認預約的邏輯
    console.log('確認預約');
  };

  return (
    <div>
      <Header title="場地資訊" showSortIcon={true} />
      <div className="centered-textbox">
        <div className="centered-text bold-text large-text">羽球場A</div>
        <div>
            <FaGlassWaterDroplet />
            <MdOutlineFamilyRestroom />
            <TbAirConditioning />
            <LuParkingCircle />
        </div>
        <div className="introduction-text">場地規則：這裡是你的場地規則介紹文字。</div>
      </div>

      {/* 添加確認預約按鈕 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleConfirmReservation}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          確認預約
        </button>
      </div>

      <FooterBar />
    </div>
  );
};

export default StadiumInfo;
