import React, { useState, useEffect } from 'react';
import './StadiumList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import mockStadium from '../../mockData/mockStadium.js'; 
import InfiniteScroll from 'react-infinite-scroll-component'; // Make sure to install this package
import { useQuery } from '@tanstack/react-query';
import { fetchStadiumList } from '../../api';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 
import { useNavigate, useParams } from 'react-router-dom';



const StadiumList = () => {
   // const [stadiums, setStadiums] = useState([]);

   const { category} = useParams();
   console.log('category is', category);
   const navigate = useNavigate();


   const { data, isLoading, isError, error } = useQuery({
    queryKey: ['stadiums', category],
    queryFn: () => fetchStadiumList(category)
});


//    const { data, isLoading, isError, error } = useQuery({
//      queryKey: ['stadiums', 'badminton'],
//      queryFn: () => fetchStadiumList('badminton')
//  });


  if (isLoading) return( 
  <div>
  <Header title="場地" showSortIcon={true}/>
  <LoadingSpinner />
  <FooterBar />
  </div>
  );

  if (isError) return <div>Error: {error.message}</div>;

  const stadiumList = data?.stadium || [];

  const handleStadiumSelect = (stadiumId, category) => {
    localStorage.setItem('selectedStadiumId', stadiumId);
    localStorage.setItem('selectedCategory', category);
    navigate('/reserve'); // Navigate to the reservation page
  };

  return (
    <div>
      <Header title="場地" showSortIcon={true}/>
      <div className="stadium-list">
          {stadiumList.map((stadium) => (
                <div 
                key={stadium.id} 
                className="stadium-item" 
                onClick={() => handleStadiumSelect(stadium.stadium_id, category)}
              >
              <img src={stadium.picture} alt={stadium.title} />
              <div className="stadium-info">
                <div className="name-address">
                  <h3>{stadium.name}</h3>
                  <span className="address">{stadium.address}</span>
                </div>
                <div className="price">
                  <p>{stadium.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default StadiumList;






