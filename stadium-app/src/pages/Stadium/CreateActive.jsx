import React, { useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import FooterBar from "../../components/FooterBar/FooterBar";
import './CreateActive.scss';
import axios from 'axios';
import { PROD_API_URL, API_URL } from '../../config/config'
import { useNavigate } from 'react-router-dom';


const CreateActive = () => {

  const [people, setPeople] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedStadiumId = localStorage.getItem('selectedStadiumId');
    const stadiumIdInt = parseInt(storedStadiumId, 10);
    const storedCategory = localStorage.getItem('selectedCategory');
    const storedDate = localStorage.getItem('selectedDate');
    const storedTimeSlot = localStorage.getItem('selectedTimeSlot');


    const dataToSend = {
      stadium_id: stadiumIdInt,
      category: storedCategory,
      name: eventName,
      people: parseInt(people, 10),
      level: parseInt(level, 10),
      description
    };
    console.log(dataToSend);

    //send to backend
    //const url = `${PROD_API_URL}/stadium/${category}/${stadium_id}/${date}/${time}`;
    // const url = `${PROD_API_URL}/stadium/${storedCategory}/${stadiumIdInt}/${date}/${time}`;
    const url = `${PROD_API_URL}/stadium/${storedCategory}/${stadiumIdInt}/${storedDate}/${storedTimeSlot}`;

    try {
      const response = await axios.post(url, dataToSend, {
        withCredentials: true
      });
      console.log('Success:', response.data);
     // setShowConfirmationModal(true); 
     alert("預約成功！即將前往我的活動列表。。。");
      setTimeout(() => {
        navigate('/activity/mylist'); 
      }, 3000); 

      localStorage.removeItem('selectedStadiumId');
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedDate');
      localStorage.removeItem('selectedTimeSlot');

      //success response ...

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigate = useNavigate(); 

  // const handleConfirmModalClose = () => {
  //   setShowConfirmationModal(false); 
  //   navigate('/activity/mylist'); 
  // };
  

  return (
    <div>
      <Header title="建立活動" showSortIcon={false} />
      <form onSubmit={handleSubmit} className="create-active-form">
        <label htmlFor="eventName">活動名稱</label>
        <input
          id="eventName"
          type="text"
          placeholder="活動名稱"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <label htmlFor="people">人數上限</label>
        <input
          id="people"
          type="number"
          placeholder="人數上限"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
        <label htmlFor="level">擅長程度</label>
        <input
          id="level"
          type="number"
          placeholder="擅長程度 (1-5)"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          min="1"
          max="5"
        />
        <label htmlFor="description">活動說明</label>
        <textarea
          id="description"
          placeholder="活動說明"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="all-join-button" type="submit">
          發起活動
        </button>
      </form>
      <FooterBar />
    </div>
  );
};

export default CreateActive;






//有時間再繼續優化modal
// import React, { useState } from 'react';
// import Header from '../../components/Header/Header.jsx';
// import FooterBar from "../../components/FooterBar/FooterBar";
// import './CreateActive.scss';
// import axios from 'axios';
// import { PROD_API_URL, API_URL } from '../../config/config'
// import ConfirmModal from '../../components/Modal/ConfirmModal';



// const CreateActive = () => {

//   const [people, setPeople] = useState('');
//   const [level, setLevel] = useState('');
//   const [description, setDescription] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 控制确认模态窗口的状态
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 控制成功模态窗口的状态

//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();

//   //   const storedStadiumId = localStorage.getItem('selectedStadiumId');
//   //   const stadiumIdInt = parseInt(storedStadiumId, 10);
//   //   const storedCategory = localStorage.getItem('selectedCategory');
//   //   const storedDate = localStorage.getItem('selectedDate');
//   //   const storedTimeSlot = localStorage.getItem('selectedTimeSlot');


//   //   const dataToSend = {
//   //     stadium_id: stadiumIdInt,
//   //     category: storedCategory,
//   //     name: eventName,
//   //     people: parseInt(people, 10),
//   //     level: parseInt(level, 10),
//   //     description
//   //   };
//   //   console.log(dataToSend);

//   //   //send to backend
//   //   //const url = `${PROD_API_URL}/stadium/${category}/${stadium_id}/${date}/${time}`;
//   //   // const url = `${PROD_API_URL}/stadium/${storedCategory}/${stadiumIdInt}/${date}/${time}`;
//   //   const url = `${PROD_API_URL}/stadium/${storedCategory}/${stadiumIdInt}/${storedDate}/${storedTimeSlot}`;

//   //   try {
//   //     const response = await axios.post(url, dataToSend, {
//   //       withCredentials: true
//   //     });
//   //     console.log('Success:', response.data);


//   //     localStorage.removeItem('selectedStadiumId');
//   //     localStorage.removeItem('selectedCategory');
//   //     localStorage.removeItem('selectedDate');
//   //     localStorage.removeItem('selectedTimeSlot');

//   //     //success response ...

//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }
//   // };


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setIsConfirmModalOpen(true);
//   };

//   const handleConfirm = async () => {
//     try {
//       const response = await axios.post(url, dataToSend, { withCredentials: true });
//       console.log('Success:', response.data);
//       setIsConfirmModalOpen(false); // 关闭确认模态窗口
//       setIsSuccessModalOpen(true); // 显示成功模态窗口
//       localStorage.removeItem('selectedStadiumId');
//       localStorage.removeItem('selectedCategory');
//       localStorage.removeItem('selectedDate');
//       localStorage.removeItem('selectedTimeSlot');
//     } catch (error) {
//       console.error('Error:', error);
//       setIsConfirmModalOpen(false); // 发生错误时关闭确认模态窗口
//     }
//   };



//   return (
//     <div>
//       <Header title="建立活動" showSortIcon={false} />
//       <form onSubmit={handleSubmit} className="create-active-form">
//         <label htmlFor="eventName">活動名稱</label>
//         <input
//           id="eventName"
//           type="text"
//           placeholder="活動名稱"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//         />

//         <label htmlFor="people">人數上限</label>
//         <input
//           id="people"
//           type="number"
//           placeholder="人數上限"
//           value={people}
//           onChange={(e) => setPeople(e.target.value)}
//         />
//         <label htmlFor="level">擅長程度</label>
//         <input
//           id="level"
//           type="number"
//           placeholder="擅長程度 (1-5)"
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//           min="1"
//           max="5"
//         />
//         <label htmlFor="description">活動說明</label>
//         <textarea
//           id="description"
//           placeholder="活動說明"
//           rows={4}
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <button className="all-join-button" type="submit">
//           發起活動
//         </button>
//       </form>

//       {isConfirmModalOpen && (
//         <ConfirmModal
//           onConfirm={handleConfirm}
//           onCancel={() => setIsConfirmModalOpen(false)}
//           eventName={eventName}
//           people={people}
//           level={level}
//           description={description}
//         />
//       )}

//       {/* 成功模态窗口 */}
//       {isSuccessModalOpen && (
//         <SuccessModal
//           message="活动创建成功！"
//           onClose={() => setIsSuccessModalOpen(false)}
//         />
//       )}

//       <FooterBar />
//     </div>
//   );
// };

// export default CreateActive;


