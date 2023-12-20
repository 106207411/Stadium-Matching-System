import React, { useState,useEffect }  from 'react';
import './StadiumInfo.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {fetchStadiumAvailable } from '../../api'; 

const StadiumInfo = () => {

  const navigate = useNavigate();


  const [category, setCategory] = useState('');
  const [stadiumId, setStadiumId] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); 


  useEffect(() => {
    const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
    const retrievedCategory = localStorage.getItem('selectedCategory');
    const retrievedDate = localStorage.getItem('selectedDate'); 

    setStadiumId(retrievedStadiumId);
    setCategory(retrievedCategory);
    setSelectedDate(retrievedDate); 

    console.log('Stadium ID:', retrievedStadiumId);
    console.log('Category:', retrievedCategory);
    console.log('Selected Date:', retrievedDate); 
  }, []);


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fetchStadiumAvailable', category, stadiumId, selectedDate],
    queryFn: () => fetchStadiumAvailable(category, stadiumId, selectedDate),
    enabled: !!stadiumId && !!category && !!selectedDate,
  });

  console.log('stadium fetch is',data );

  if (data && data.data) {
    console.log('Price is:', data.data.price);
    console.log('Rule is:', data.data.rule);
  }


  const handleConfirmReservation = () => {
    console.log('確認預約');
    navigate('/stadium/create');
  };


  return (
    <div>
      <Header title="場地資訊" showSortIcon={true} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {data && data.data && (
        <div className="centered-textbox">
          <div className="centered-text bold-text large-text">{data.data.name}</div>
          <div className="icon-container">
            {data.data.water === 1 && <FaGlassWaterDroplet  className="icon" />}
            {data.data.bathroom === 1 && <MdOutlineFamilyRestroom className="icon"  />}
            {data.data.air_condition === 1 && <TbAirConditioning className="icon"  />}
            {data.data.vending === 1 && <LuParkingCircle className="icon"  />}
          </div>
          <div className="introduction-text">場地規則：{data.data.rule}</div>
          {data.data.picture && (
            <img src={data.data.picture} alt="場地圖片" className="info-stadium-image" />
          )}
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
  onClick={handleConfirmReservation}
  className="confirm-reservation-button"
>
  確認預約
</button>
      </div>
      <FooterBar />
    </div>
  );
};

export default StadiumInfo;

