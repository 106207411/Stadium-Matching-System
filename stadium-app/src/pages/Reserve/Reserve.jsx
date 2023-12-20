
//顯示可預約狀態

import * as React from "react";
import { useState, useEffect } from "react";
import Header from '../../components/Header/Header.jsx'; 
import FooterBar from "../../components/FooterBar/FooterBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 
import {fetchStadiumAvailable } from '../../api'; 
import Button from '@mui/material/Button';
import dayjs from 'dayjs';



export default function BasicDateCalendar() {
  //const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedItems, setSelectedItems] = useState(null);
  //const [selectedItems, setSelectedItems] = React.useState([]);
  const [stadiumId, setStadiumId] = useState(null); 
  const [category, setCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  
  function formatDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    // Retrieve the stadium_id from local storage
    const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
    const retrievedCategory = localStorage.getItem('selectedCategory');
    console.log('Stadium ID:', retrievedStadiumId);
    console.log('Category:', retrievedCategory);
    setStadiumId(retrievedStadiumId);
    setCategory(retrievedCategory);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['fetchStadiumAvailable', category, stadiumId, selectedDate],
    queryFn: () => fetchStadiumAvailable(category, stadiumId, selectedDate),
    enabled: !!stadiumId && !!category && !!selectedDate, // This ensures the query runs only if these values are available
    onSuccess: (responseData) => {
      console.log("Response Data:", responseData);
      if (responseData && responseData.times) {
        setAvailability(responseData.times);
        console.log("Available times:", responseData.times);
      }
    },
  });
  
  const navigate = useNavigate();
  console.log('fetch available data is',data );

  if (data && data.data) {
    console.log('Available times are:', data.data.times);
    console.log('Price is:', data.data.price);
    console.log('Rule is:', data.data.rule);
  }

 // console.log('fetch available times is',data.times );
  //console.log('ava time',data.times );

  

  // const handleItemClick = (row, col) => {
  //   setSelectedItems([{ row, col }]);
  // };

  
  // const handleItemClick = (row, col) => {
  //   // 確認是否已經選中
  //   const isItemSelected = selectedItems.some(
  //     (item) => item.row === row && item.col === col,
  //   );
  //   if (isItemSelected) {
  //     // 可以取消選擇
  //     setSelectedItems([]);
  //   } else {
  //     // 設為點擊的時間段
  //     setSelectedItems([{ row, col }]);
  //   }
  // };

  const handleItemClick = (row, col) => {
    const index = getTimeSlotIndex(row, col); 
    if (selectedItems === index) {
      // 如果已经选中，取消选择
      setSelectedItems(null);
    } else {
      // 否则设置为新的选择
      setSelectedItems(index);
    }
  };




  const getText = (row, col) => {
    const textOptions = [
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00",
    ];

    const index = (row - 1) * 3 + (col - 1);
    return textOptions[index];
  };

  const getTimeSlotIndex = (row, col) => {
    return (row - 1) * 3 + col;
  };

  // const getText = (row, col) => {
  //   const index = (row - 1) * 3 + (col - 1);
  //   return index + 1; // 从1开始计数
  // };

  // const handleSend = () => {
  //   console.log("Selected Date:", selectedDate);
  //   console.log(
  //     "Selected Items:",
  //     selectedItems.map((item) => getText(item.row, item.col)),
  //   );
  // };

  // const handleSend = () => {
  //   setIsModalOpen(true);
  // };

  const handleSend = () => {
    const dataToSend = {
      date: selectedDate,
      timeSlot: selectedItems 
    };
  
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedTimeSlot', selectedItems); // 存储单个时间段的索引
  
    console.log("Data to send:", dataToSend);
    navigate('/stadium/info');
  };

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSelectedItems(null); 
  };

  if (isLoading) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header title="預約時段" showSortIcon={true} />
  
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
          />
          <LoadingSpinner />
        </LocalizationProvider>
        
        <FooterBar />
      </div>
    );
  }
  


  if (isError) return <div>Error: {error.message}</div>;



  return (
    <div style={{ marginTop: "100px" }}>
      <Header title="預約時段" showSortIcon={true} />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs(selectedDate)}
          onChange={handleDateChange}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {[1, 2, 3, 4].map((row) => (
            <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
              {[1, 2, 3].map((col) => (

                <div
                  key={col}
                  style={{
                    width: "110px",
                    height: "40px",
                    border: "1px solid #000",
                    margin: "0 5px",
                    marginBottom: "0.5em",
                    cursor: "pointer",
                    backgroundColor: selectedItems === getTimeSlotIndex(row, col) ? "#ffcccc" : "#f0f0f0",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleItemClick(row, col)}
                >
                  <div>{getText(row, col)}</div>
                </div>

              ))}
            </div>
          ))}
        </div>
        <div className='reserve_activity'>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            {/* <Button variant="contained"  onClick={openModal}>確認預定</Button> */}
            {/* <Button variant="contained" onClick={() => handleSend}>確認預定</Button> */}
            <Button variant="contained" onClick={handleSend}>確認預定</Button>
          </div>
        </div>
      </LocalizationProvider>
      <FooterBar />
    </div>
  );
}












// //我從不能顯示true false的版本拉出來改的

// import * as React from "react";
// import { useState, useEffect } from "react";
// import Header from '../../components/Header/Header.jsx'; 
// import FooterBar from "../../components/FooterBar/FooterBar";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/Loading/LoadingPage'; 
// import {fetchStadiumAvailable } from '../../api'; 
// import Button from '@mui/material/Button';
// import ReserveModal from '../../components/Modal/ReserveModal'; 
// import dayjs from 'dayjs';



// export default function BasicDateCalendar() {
//   //const [selectedDate, setSelectedDate] = React.useState(null);
//   const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
//   const [selectedItems, setSelectedItems] = useState(null);
//   //const [selectedItems, setSelectedItems] = React.useState([]);
//   const [stadiumId, setStadiumId] = useState(null); 
//   const [category, setCategory] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  

  
//   function formatDate(date) {
//     let year = date.getFullYear();
//     let month = (1 + date.getMonth()).toString().padStart(2, '0');
//     let day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   useEffect(() => {
//     // Retrieve the stadium_id from local storage
//     const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
//     const retrievedCategory = localStorage.getItem('selectedCategory');
//     console.log('Stadium ID:', retrievedStadiumId);
//     console.log('Category:', retrievedCategory);
//     setStadiumId(retrievedStadiumId);
//     setCategory(retrievedCategory);
//   }, []);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['fetchStadiumAvailable', category, stadiumId, selectedDate],
//     queryFn: () => fetchStadiumAvailable(category, stadiumId, selectedDate),
//     enabled: !!stadiumId && !!category && !!selectedDate, // This ensures the query runs only if these values are available
//     onSuccess: (responseData) => {
//       console.log("Response Data:", responseData);
//       if (responseData && responseData.times) {
//         setAvailability(responseData.times);
//         console.log("Available times:", responseData.times);
//       }
//     },
//   });
  
//   const navigate = useNavigate();
//   console.log('fetch available data is',data );

//   if (data && data.data) {
//     console.log('Available times are:', data.data.times);
//     console.log('Price is:', data.data.price);
//     console.log('Rule is:', data.data.rule);
//   }

//  // console.log('fetch available times is',data.times );
//   //console.log('ava time',data.times );

  

//   // const handleItemClick = (row, col) => {
//   //   setSelectedItems([{ row, col }]);
//   // };

  
//   // const handleItemClick = (row, col) => {
//   //   // 確認是否已經選中
//   //   const isItemSelected = selectedItems.some(
//   //     (item) => item.row === row && item.col === col,
//   //   );
//   //   if (isItemSelected) {
//   //     // 可以取消選擇
//   //     setSelectedItems([]);
//   //   } else {
//   //     // 設為點擊的時間段
//   //     setSelectedItems([{ row, col }]);
//   //   }
//   // };

//   const handleItemClick = (row, col) => {
//     const index = getTimeSlotIndex(row, col); 
//     if (selectedItems === index) {
//       // 如果已经选中，取消选择
//       setSelectedItems(null);
//     } else {
//       // 否则设置为新的选择
//       setSelectedItems(index);
//     }
//   };




//   const getText = (row, col) => {
//     const textOptions = [
//       "09:00-10:00",
//       "10:00-11:00",
//       "11:00-12:00",
//       "12:00-13:00",
//       "13:00-14:00",
//       "14:00-15:00",
//       "15:00-16:00",
//       "16:00-17:00",
//       "17:00-18:00",
//       "18:00-19:00",
//       "19:00-20:00",
//       "20:00-21:00",
//     ];

//     const index = (row - 1) * 3 + (col - 1);
//     return textOptions[index];
//   };

//   const getTimeSlotIndex = (row, col) => {
//     return (row - 1) * 3 + col;
//   };

//   // const getText = (row, col) => {
//   //   const index = (row - 1) * 3 + (col - 1);
//   //   return index + 1; // 从1开始计数
//   // };

//   // const handleSend = () => {
//   //   console.log("Selected Date:", selectedDate);
//   //   console.log(
//   //     "Selected Items:",
//   //     selectedItems.map((item) => getText(item.row, item.col)),
//   //   );
//   // };

//   // const handleSend = () => {
//   //   setIsModalOpen(true);
//   // };

//   const handleSend = () => {
//     const dataToSend = {
//       date: selectedDate,
//       timeSlot: selectedItems 
//     };
  
//     localStorage.setItem('selectedDate', selectedDate);
//     localStorage.setItem('selectedTimeSlot', selectedItems); // 存储单个时间段的索引
  
//     console.log("Data to send:", dataToSend);
//     navigate('/stadium/info');
//   };

//   const handleDateChange = (newDate) => {
//     const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
//     setSelectedDate(formattedDate);
//     setSelectedItems(null); 
//   };

//   if (isLoading) {
//     return (
//       <div style={{ marginTop: "100px" }}>
//         <Header title="預約時段" showSortIcon={true} />
  
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             value={dayjs(selectedDate)}
//             onChange={handleDateChange}
//           />
//           <LoadingSpinner />
//         </LocalizationProvider>
        
//         <FooterBar />
//       </div>
//     );
//   }
  


//   if (isError) return <div>Error: {error.message}</div>;



//   return (
//     <div style={{ marginTop: "100px" }}>
//       <Header title="預約時段" showSortIcon={true} />

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateCalendar
//           value={dayjs(selectedDate)}
//           onChange={handleDateChange}
//         />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: "20px",
//           }}
//         >
//           {[1, 2, 3, 4].map((row) => (
//             <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
//               {[1, 2, 3].map((col) => (

//                 <div
//                   key={col}
//                   style={{
//                     width: "110px",
//                     height: "40px",
//                     border: "1px solid #000",
//                     margin: "0 5px",
//                     marginBottom: "0.5em",
//                     cursor: "pointer",
//                     backgroundColor: selectedItems === getTimeSlotIndex(row, col) ? "#ffcccc" : "#f0f0f0",
//                     borderRadius: "5px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                   onClick={() => handleItemClick(row, col)}
//                 >
//                   <div>{getText(row, col)}</div>
//                 </div>

//               ))}
//             </div>
//           ))}
//         </div>
//         <div className='reserve_activity'>
//           <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//           }}>
//             {/* <Button variant="contained"  onClick={openModal}>確認預定</Button> */}
//             {/* <Button variant="contained" onClick={() => handleSend}>確認預定</Button> */}
//             <Button variant="contained" onClick={handleSend}>確認預定</Button>
//           </div>
//         </div>
//       </LocalizationProvider>
//       <FooterBar />
//     </div>
//   );
// }


























// import * as React from "react";
// import { useState, useEffect } from "react";
// import Header from '../../components/Header/Header.jsx'; 
// import FooterBar from "../../components/FooterBar/FooterBar";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/Loading/LoadingPage'; 
// import {fetchStadiumAvailable } from '../../api'; 
// import Button from '@mui/material/Button';
// import ReserveModal from '../../components/Modal/ReserveModal'; 
// import dayjs from 'dayjs';



// export default function BasicDateCalendar() {
//   //const [selectedDate, setSelectedDate] = React.useState(null);
//   const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
//   const [selectedItems, setSelectedItems] = React.useState([]);
//   const [stadiumId, setStadiumId] = useState(null); 
//   const [category, setCategory] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [availability, setAvailability] = useState({});


  
//   function formatDate(date) {
//     let year = date.getFullYear();
//     let month = (1 + date.getMonth()).toString().padStart(2, '0');
//     let day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   useEffect(() => {
//     // Retrieve the stadium_id from local storage
//     const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
//     const retrievedCategory = localStorage.getItem('selectedCategory');
//     console.log('Stadium ID:', retrievedStadiumId);
//     console.log('Category:', retrievedCategory);
//     setStadiumId(retrievedStadiumId);
//     setCategory(retrievedCategory);
//   }, []);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['fetchStadiumAvailable', category, stadiumId, selectedDate],
//     queryFn: () => fetchStadiumAvailable(category, stadiumId, selectedDate),
//     enabled: !!stadiumId && !!category && !!selectedDate, // This ensures the query runs only if these values are available
//     // onSuccess: (responseData) => {
//     //   if (responseData && responseData.times) {
//     //     setAvailability(responseData.times);
//     //   }
//     // },
//   });
  
  

//   console.log('fetch available data is',data );

//   // if (data && data.data) {
//   //   console.log('Available times are:', data.data.times);
//   //   setAvailability(data.data.times);
//   //   console.log('Current availability:', availability);
//   //   console.log('Price is:', data.data.price);
//   //   console.log('Rule is:', data.data.rule);
//   // }

//   useEffect(() => {
//     if (data && data.data) {
//       console.log('Available times are:', data.data.times);
//       setAvailability(data.data.times);
//       console.log('Current availability:', availability);
//       console.log('Price is:', data.data.price);
//       console.log('Rule is:', data.data.rule);
//     }
//   }, [data]); // 只在 data 变化时运行



//  // console.log('fetch available times is',data.times );
//   //console.log('ava time',data.times );

  
//   const handleItemClick = (row, col) => {
//     const isItemSelected = selectedItems.some(
//       (item) => item.row === row && item.col === col,
//     );

//     if (isItemSelected) {
//       // 已经变色
//       setSelectedItems((prevItems) =>
//         prevItems.filter((item) => !(item.row === row && item.col === col)),
//       );
//     } else {
//       // 還未变色
//       setSelectedItems((prevItems) => [...prevItems, { row, col }]);
//     }
//   };


//   const getText = (row, col) => {
//     const textOptions = [
//       "9:00-10:00",
//       "10:00-11:00",
//       "11:00-12:00",
//       "12:00-13:00",
//       "13:00-14:00",
//       "14:00-15:00",
//       "15:00-16:00",
//       "16:00-17:00",
//       "17:00-18:00",
//       "18:00-19:00",
//       "19:00-20:00",
//       "20:00-21:00",
//     ];

//     const index = (row - 1) * 3 + (col - 1);
//     return textOptions[index];
//   };




//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleConfirm = () => {
//     console.log("Sending data to API...");
//     // 这里调用 API 或处理确认逻辑
//     setIsModalOpen(false); // 关闭模态窗口
//   };
  
//   const handleCancel = () => {
//     setIsModalOpen(false); // 关闭模态窗口
//   };

//   const handleDateChange = (newDate) => {
//     const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
//     setSelectedDate(formattedDate);
//     setSelectedItems([]);
//   };

//   if (isLoading) {
//     return (
//       <div style={{ marginTop: "100px" }}>
//         <Header title="預約時段" showSortIcon={true} />
  
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             value={dayjs(selectedDate)}
//             onChange={handleDateChange}
//           />
//           <LoadingSpinner />
//         </LocalizationProvider>
        
//         <FooterBar />
//       </div>
//     );
//   }
  


//   if (isError) return <div>Error: {error.message}</div>;


  
//   return (
//     <div style={{ marginTop: "100px" }}>
//       <Header title="預約時段" showSortIcon={true}/>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//           value={dayjs(selectedDate)}
//           onChange={handleDateChange}
//         />
//         {/* <DateCalendar
//           onChange={(newDate) => {
//             setSelectedItems([]);
//             console.log('now date is' , newDate)
//             setSelectedDate(newDate);
//           }}
//         /> */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: "20px",
//           }}
//         >
// {[1, 2, 3, 4].map((row) => (
//   <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
//     {[1, 2, 3].map((col) => {
//       const timeSlot = getText(row, col);
//       const isAvailable = availability[timeSlot];
//       return (
//             <div
//             key={col}
//             style={{
//               width: "110px",
//             height: "40px",
//             border: "1px solid #000",
//             margin: "0 5px",
//             marginBottom: "0.5em",
//               cursor: isAvailable ? "pointer" : "not-allowed",
//               backgroundColor: selectedItems.some(
//                 (item) => item.row === row && item.col === col,
//               )
//                 ? "#ffcccc"
//                 : "#f0f0f0",
//              // backgroundColor: isAvailable ? "#f0f0f0" : "#A9A9A9",
//               // ... 其他样式
//             }}
//             onClick={() => isAvailable && handleItemClick(row, col)}
//           >
//             <div>{timeSlot}</div>
//         </div>
//       );
//     })}
//   </div>
// ))}

//         </div>
//       <div className='reserve_activity'>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//       }}>
//           <Button variant="contained"  onClick={openModal}>確認預定</Button>
//         {/* <Button variant="contained" onClick={() => handleSend}>確認預定</Button> */}
//         <ReserveModal
//       isOpen={isModalOpen}
//       selectedDate={selectedDate}
//       selectedTimeSlots={selectedItems.map(item => getText(item.row, item.col))}
//       onConfirm={handleConfirm}
//       onCancel={handleCancel}
//     />
//       </div>
//     </div> 
//       </LocalizationProvider>
//     <FooterBar />
//   </div>
//   );
// }









//此版本可以正確切換以及跳出modal, 但無法判斷true false

// import * as React from "react";
// import { useState, useEffect } from "react";
// import Header from '../../components/Header/Header.jsx'; 
// import FooterBar from "../../components/FooterBar/FooterBar";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/Loading/LoadingPage'; 
// import {fetchStadiumAvailable } from '../../api'; 
// import Button from '@mui/material/Button';
// import ReserveModal from '../../components/Modal/ReserveModal'; 
// import dayjs from 'dayjs';



// export default function BasicDateCalendar() {
//   //const [selectedDate, setSelectedDate] = React.useState(null);
//   const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
//   const [selectedItems, setSelectedItems] = React.useState([]);
//   const [stadiumId, setStadiumId] = useState(null); 
//   const [category, setCategory] = useState(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);
  

  
//   function formatDate(date) {
//     let year = date.getFullYear();
//     let month = (1 + date.getMonth()).toString().padStart(2, '0');
//     let day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   useEffect(() => {
//     // Retrieve the stadium_id from local storage
//     const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
//     const retrievedCategory = localStorage.getItem('selectedCategory');
//     console.log('Stadium ID:', retrievedStadiumId);
//     console.log('Category:', retrievedCategory);
//     setStadiumId(retrievedStadiumId);
//     setCategory(retrievedCategory);
//   }, []);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['fetchStadiumAvailable', category, stadiumId, selectedDate],
//     queryFn: () => fetchStadiumAvailable(category, stadiumId, selectedDate),
//     enabled: !!stadiumId && !!category && !!selectedDate, // This ensures the query runs only if these values are available
//     onSuccess: (responseData) => {
//       console.log("Response Data:", responseData);
//       if (responseData && responseData.times) {
//         setAvailability(responseData.times);
//         console.log("Available times:", responseData.times);
//       }
//     },
//   });
  
//   const navigate = useNavigate();

//   console.log('fetch available data is',data );

//   if (data && data.data) {
//     console.log('Available times are:', data.data.times);
//     console.log('Price is:', data.data.price);
//     console.log('Rule is:', data.data.rule);
//   }

//  // console.log('fetch available times is',data.times );
//   //console.log('ava time',data.times );

  
//   const handleItemClick = (row, col) => {
//     const isItemSelected = selectedItems.some(
//       (item) => item.row === row && item.col === col,
//     );

//     if (isItemSelected) {
//       // 已经变色
//       setSelectedItems((prevItems) =>
//         prevItems.filter((item) => !(item.row === row && item.col === col)),
//       );
//     } else {
//       // 還未变色
//       setSelectedItems((prevItems) => [...prevItems, { row, col }]);
//     }
//   };

//   // const handleItemClick = (row, col) => {
//   //   const timeSlot = getText(row, col);
//   //   if (!availability[timeSlot]) return; // 如果时间段不可用，则不执行任何操作
  
//   //   const isItemSelected = selectedItems.some(
//   //     (item) => item.row === row && item.col === col,
//   //   );
  
//   //   if (isItemSelected) {
//   //     // 如果已经选中，则取消选中
//   //     setSelectedItems((prevItems) =>
//   //       prevItems.filter((item) => !(item.row === row && item.col === col)),
//   //     );
//   //   } else {
//   //     // 如果未选中，则添加到选中列表中
//   //     setSelectedItems((prevItems) => [...prevItems, { row, col }]);
//   //   }
//   // };



//   const getText = (row, col) => {
//     const textOptions = [
//       "9:00-10:00",
//       "10:00-11:00",
//       "11:00-12:00",
//       "12:00-13:00",
//       "13:00-14:00",
//       "14:00-15:00",
//       "15:00-16:00",
//       "16:00-17:00",
//       "17:00-18:00",
//       "18:00-19:00",
//       "19:00-20:00",
//       "20:00-21:00",
//     ];

//     const index = (row - 1) * 3 + (col - 1);
//     return textOptions[index];
//   };

//   // const handleSend = () => {
//   //   console.log("Selected Date:", selectedDate);
//   //   console.log(
//   //     "Selected Items:",
//   //     selectedItems.map((item) => getText(item.row, item.col)),
//   //   );
//   // };

//   // const handleSend = () => {
//   //   setIsModalOpen(true);
//   // };

//   const handleSend = () => {
//     // ... 可能的其他逻辑
//     navigate('/stadium/info');
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleConfirm = () => {

//     const dataToSend = {
//       stadium_id: stadiumId, 
//       category:category,
//       date: selectedDate,
//       timeSlots: selectedItems.map(item => getText(item.row, item.col))
//     };

//     //: /api/stadium/:catogory/:stadium_id/:date/:time
  
//     //給後端的data
//     console.log("Data to send to API:", dataToSend);

//     console.log("Sending data to API...");
//     // 这里调用 API 或处理确认逻辑
//     setIsModalOpen(false); // 关闭模态窗口
//   };
  
//   const handleCancel = () => {
//     setIsModalOpen(false); // 关闭模态窗口
//   };

//   const handleDateChange = (newDate) => {
//     const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
//     setSelectedDate(formattedDate);
//     setSelectedItems([]);
//   };

//   if (isLoading) {
//     return (
//       <div style={{ marginTop: "100px" }}>
//         <Header title="預約時段" showSortIcon={true} />
  
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DateCalendar
//             value={dayjs(selectedDate)}
//             onChange={handleDateChange}
//           />
//           <LoadingSpinner />
//         </LocalizationProvider>
        
//         <FooterBar />
//       </div>
//     );
//   }
  


//   if (isError) return <div>Error: {error.message}</div>;


  
//   return (
//     <div style={{ marginTop: "100px" }}>
//       <Header title="預約時段" showSortIcon={true}/>

//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//           value={dayjs(selectedDate)}
//           onChange={handleDateChange}
//         />
//         {/* <DateCalendar
//           onChange={(newDate) => {
//             setSelectedItems([]);
//             console.log('now date is' , newDate)
//             setSelectedDate(newDate);
//           }}
//         /> */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginTop: "20px",
//           }}
//         >
//           {[1, 2, 3, 4].map((row) => (
//             <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
//               {[1, 2, 3].map((col) => (
         
//                 <div
//                   key={col}
//                   style={{
//                     width: "110px",
//                     height: "40px",
//                     border: "1px solid #000",
//                     margin: "0 5px",
//                     marginBottom: "0.5em",
//                     cursor: "pointer",
//                     backgroundColor: selectedItems.some(
//                       (item) => item.row === row && item.col === col,
//                     )
//                       ? "#ffcccc"
//                       : "#f0f0f0",
//                     borderRadius: "5px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                   onClick={() => handleItemClick(row, col)}
//                 >
//                   <div>{getText(row, col)}</div>

//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       <div className='reserve_activity'>
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//       }}>
//           {/* <Button variant="contained"  onClick={openModal}>確認預定</Button> */}
//         {/* <Button variant="contained" onClick={() => handleSend}>確認預定</Button> */}
//         <Button variant="contained" onClick={handleSend}>確認預定</Button>
//         <ReserveModal
//       isOpen={isModalOpen}
//       selectedDate={selectedDate}
//       selectedTimeSlots={selectedItems.map(item => getText(item.row, item.col))}
//       onConfirm={handleConfirm}
//       onCancel={handleCancel}
//     />
//       </div>
//     </div> 
//       </LocalizationProvider>
//     <FooterBar />
//   </div>
//   );
// }










// return (
//   <div style={{ marginTop: "100px" }}>
//     <Header title="預約時段" showSortIcon={true}/>

//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//           value={dayjs(selectedDate)}
//           onChange={handleDateChange}
//       />
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginTop: "20px",
//         }}
//       >
//         {[1, 2, 3, 4].map((row) => (
//           <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
//             {[1, 2, 3].map((col) => {
//               const timeSlot = getText(row, col);
//               const isAvailable = availability[timeSlot];
//               const isItemSelected = selectedItems.some(item => item.row === row && item.col === col);

//               return (
//                 <div
//                   key={col}
//                   style={{
//                     width: "110px",
//                     height: "40px",
//                     border: "1px solid #000",
//                     margin: "0 5px",
//                     marginBottom: "0.5em",
//                     cursor: isAvailable ? "pointer" : "not-allowed",
//                     backgroundColor: isItemSelected ? "#ffcccc" : isAvailable ? "#f0f0f0" : "#a0a0a0",
//                     borderRadius: "5px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                   onClick={() => isAvailable && handleItemClick(row, col)}
//                 >
//                   <div>{timeSlot}</div>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </LocalizationProvider>
    
//     <div className='reserve_activity'>
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <Button variant="contained" onClick={openModal}>確認預定</Button>
//         <ReserveModal
//           isOpen={isModalOpen}
//           selectedDate={selectedDate}
//           selectedTimeSlots={selectedItems.map(item => getText(item.row, item.col))}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       </div>
//     </div> 
//     <FooterBar />
//   </div>
// );
