
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
import { fetchStadiumAvailable } from '../../api';
import dayjs from 'dayjs';
import './Reserve.scss'



export default function BasicDateCalendar() {

  const today = dayjs();

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [selectedItems, setSelectedItems] = useState(null);
  const [stadiumId, setStadiumId] = useState(null);
  const [category, setCategory] = useState(null);
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState([]);


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

  const navigate = useNavigate();
  console.log('fetch available data is', data);


  useEffect(() => {
    if (data && data.data) {
      console.log('Available times are:', data.data.times);
      console.log('Price is:', data.data.price);
      console.log('Rule is:', data.data.rule);

      const availableTimes = data.data.times;
      const timeSlots = [
        "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00",
        "17:00", "18:00", "19:00", "20:00"
      ];

      const availabilityArray = timeSlots.map(timeSlot => !!availableTimes[timeSlot]);
      setTimeSlotsAvailability(availabilityArray);
    }
  }, [data]);

  const handleItemClick = (row, col) => {
    const index = getTimeSlotIndex(row, col);
    if (selectedItems === index) {
      setSelectedItems(null);
    } else {
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

  const handleSend = () => {
    const dataToSend = {
      date: selectedDate,
      timeSlot: selectedItems
    };

    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedTimeSlot', selectedItems);

    console.log("Data to send:", dataToSend);
    navigate('/stadium/info');
  };

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSelectedItems(null);
  };

  const minSelectableDate = dayjs().startOf('day'); 

  if (isLoading) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header title="預約時段" showSortIcon={true} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            minDate={today}
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
          minDate={today}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div className="time-slots-container">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} style={{ display: "flex", marginBottom: "15px" }}>
                {[1, 2, 3].map((col) => {
                  const timeSlotIndex = getTimeSlotIndex(row, col) - 1;
                  const isAvailable = timeSlotsAvailability[timeSlotIndex];
                  const isSelected = selectedItems === timeSlotIndex + 1;
                  return (
                    <div
                      key={col}
                      className={`time-slot ${isAvailable ? (isSelected ? 'time-slot-selected' : 'time-slot-available') : 'time-slot-unavailable'}`}
                      onClick={() => isAvailable && handleItemClick(row, col)}
                    >
                      <div>{getText(row, col)}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className='reserve_activity'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="reserve-join-button" onClick={handleSend}>確認預定</button>
            </div>
          </div>
        </div>
      </LocalizationProvider>
      <FooterBar />
    </div>
  );

}








