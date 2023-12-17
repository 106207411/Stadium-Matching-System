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




export default function BasicDateCalendar() {
 //const [selectedDate, setSelectedDate] = React.useState(null);
 const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [stadiumId, setStadiumId] = useState(null); 
  const [category, setCategory] = useState(null);
  
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
  });
  

  console.log('fetch available data is',data );

  

  const handleItemClick = (row, col) => {
    const isItemSelected = selectedItems.some(
      (item) => item.row === row && item.col === col,
    );

    if (isItemSelected) {
      // 已经变色
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => !(item.row === row && item.col === col)),
      );
    } else {
      // 還未变色
      setSelectedItems((prevItems) => [...prevItems, { row, col }]);
    }
  };

  const getText = (row, col) => {
    const textOptions = [
      "9:00-10:00",
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

  const handleSend = () => {
    console.log("Selected Date:", selectedDate);
    console.log(
      "Selected Items:",
      selectedItems.map((item) => getText(item.row, item.col)),
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div style={{ marginTop: "100px" }}>
      <Header title="預約時段" showSortIcon={true}/>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          onChange={(newDate) => {
            setSelectedItems([]);
            setSelectedDate(newDate);
          }}
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
                    backgroundColor: selectedItems.some(
                      (item) => item.row === row && item.col === col,
                    )
                      ? "#ffcccc"
                      : "#f0f0f0",
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
        <Button variant="contained" onClick={() => handleSend}>確認預定</Button>
      </div>
    </div> 
      <FooterBar />
      </LocalizationProvider>
    <FooterBar />
  </div>
  );
}
