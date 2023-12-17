import * as React from "react";
import { useState, useEffect } from "react";
import Header from '../../components/Header/Header.jsx'; 
import FooterBar from "../../components/FooterBar/FooterBar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [stadiumId, setStadiumId] = useState(null); 

  useEffect(() => {
    // Retrieve the stadium_id from local storage
    const retrievedStadiumId = localStorage.getItem('selectedStadiumId');
    console.log('now retrievedStadiumId is',retrievedStadiumId);
    setStadiumId(retrievedStadiumId);
  }, []);

  

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
      "8:00-9:00",
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
      "21:00-22:00",
      "22:00-23:00",
      "23:00-24:00",
    ];

    const index = (row - 1) * 4 + (col - 1);
    return textOptions[index];
  };

  const handleSend = () => {
    console.log("Selected Date:", selectedDate);
    console.log(
      "Selected Items:",
      selectedItems.map((item) => getText(item.row, item.col)),
    );
  };

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
              {[1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  style={{
                    width: "95px",
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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{ padding: "10px 20px", fontSize: "16px" }}
            onClick={handleSend}
          >
            送出
          </button>
        </div>
      </LocalizationProvider>
    <FooterBar />
  </div>
  );
}
