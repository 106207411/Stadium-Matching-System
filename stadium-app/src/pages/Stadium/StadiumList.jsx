import React, { useState, useEffect } from 'react';
import './StadiumList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import mockStadium from '../../mockData/mockStadium.js'; 
import InfiniteScroll from 'react-infinite-scroll-component'; // Make sure to install this package

const StadiumList = () => {
    const [stadiums, setStadiums] = useState([]);
    const [visibleStadiums, setVisibleStadiums] = useState([]);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      // Load mock data instead of fetching from an API
      setStadiums(mockStadium);
    }, []);
  
    useEffect(() => {
      // Initial load
      if (stadiums.length > 0) {
        setVisibleStadiums(stadiums.slice(0, 10)); // 初始顯示10個場地
      }
    }, [stadiums]);
  
    const loadMoreStadiums = () => {
      // 載入更多場地
      const currentLength = visibleStadiums.length;
      const newVisibleStadiums = stadiums.slice(
        currentLength,
        currentLength + 10 // 每次載入10個場地
      );
  
      if (newVisibleStadiums.length === 0) {
        setHasMore(false); // 沒有更多場地可載入
      } else {
        setVisibleStadiums([...visibleStadiums, ...newVisibleStadiums]);
      }
    };
  

  return (
    <div>
      <Header title="場地" />
      <div className="stadium-list">
        <InfiniteScroll
          dataLength={visibleStadiums.length}
          next={loadMoreStadiums}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {visibleStadiums.map((stadium) => (
            <div key={stadium.id} className="stadium-item">
              <img src={stadium.image} alt={stadium.title} />
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
        </InfiniteScroll>
      </div>
      <FooterBar />
    </div>
  );
};

export default StadiumList;




