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
  const [selectedDate, setSelectedDate] = useState(''); // 假设有 selectedDate

  // 从 localStorage 中获取数据
  useEffect(() => {
    const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
    const retrievedCategory = localStorage.getItem('selectedCategory');
    const retrievedDate = localStorage.getItem('selectedDate'); // 假设有 selectedDate

    setStadiumId(retrievedStadiumId);
    setCategory(retrievedCategory);
    setSelectedDate(retrievedDate); 

    console.log('Stadium ID:', retrievedStadiumId);
    console.log('Category:', retrievedCategory);
    console.log('Selected Date:', retrievedDate); // 打印日期
  }, []);

  // 使用 useQuery 获取数据
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
    // 在這裡處理確認預約的邏輯
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
          <div>
            {data.data.water === 1 && <FaGlassWaterDroplet />}
            {data.data.bathroom === 1 && <MdOutlineFamilyRestroom />}
            {data.data.air_condition === 1 && <TbAirConditioning />}
            {data.data.vending === 1 && <LuParkingCircle />}
          </div>
          <div className="introduction-text">場地規則：{data.data.rule}</div>
        </div>
      )}
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


// 這是好的版本
// import React from 'react';
// import './StadiumInfo.scss';
// import FooterBar from '../../components/FooterBar/FooterBar.jsx';
// import Header from '../../components/Header/Header.jsx';
// import { FaGlassWaterDroplet } from "react-icons/fa6";
// import { MdOutlineFamilyRestroom } from "react-icons/md";
// import { TbAirConditioning } from "react-icons/tb";
// import { LuParkingCircle } from "react-icons/lu";
// import { useNavigate } from 'react-router-dom';

// const StadiumInfo = () => {

//   const navigate = useNavigate();

//   const handleConfirmReservation = () => {
//     // 在這裡處理確認預約的邏輯
//     console.log('確認預約');
//     navigate('/stadium/create');
//   };



//   return (
//     <div>
//       <Header title="場地資訊" showSortIcon={true} />
//       <div className="centered-textbox">
//         <div className="centered-text bold-text large-text">羽球場A</div>
//         <div>
//             <FaGlassWaterDroplet />
//             <MdOutlineFamilyRestroom />
//             <TbAirConditioning />
//             <LuParkingCircle />
//         </div>
//         <div className="introduction-text">場地規則：請詳閱注意事項</div>
//       </div>

//       {/* 添加確認預約按鈕 */}
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <button
//           onClick={handleConfirmReservation}
//           style={{ padding: '10px 20px', fontSize: '16px' }}
//         >
//           確認預約
//         </button>
//       </div>

//       <FooterBar />
//     </div>
//   );
// };

// export default StadiumInfo;
