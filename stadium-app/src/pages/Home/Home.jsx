import React from 'react';
import { useAuth } from "../../context/AuthContext";
import './Home.scss';
import FooterBar from "../../components/FooterBar/FooterBar";

const Home = () => {
  const { logout } = useAuth();

  const sports = ['tennis', 'tabletennis', 'badminton', 'basketball', 'volley', 'baseball', 'gym', 'swimming'];
  const activities = ['b1', 'b2'];

  return (
    <div className="home-container">
        <div class="button-container">
          <button onClick={logout}>Logout</button>
        </div>

      <div className="search-bar">
        <input type="search" placeholder="Search for a sport or venue" />
      </div>

      <div className="options-container">
      <div className="options-section">
        <button className="option active">Map</button>
        <button className="option">List</button>
      </div>
      </div>


      <div className="sports-container">
        <div className="title-container">
          <div className="title-left">場地</div>
          <div className="title-right">
            <a href="#">更多</a>
          </div>
        </div>
        <div className="sports-section">
          {sports.map(sport => (
            <div key={sport} className="sport">
              <img src={`/${sport}.png`} alt={sport} />
            </div>
          ))}
        </div>
      </div>



      <div className="activity-container">
        <div className="title-container">
          <div className="title-left">活動</div>
          <div className="title-right">
            <a href="#">更多</a>
          </div>
        </div>
        <div className="activity-section">
        {activities.map(activity => (
          <div key={activity} className="activity">
            <img src={`/${activity}.jpg`} alt={activity} />
          </div>
        ))}
        </div>
      </div>

      <FooterBar />
    </div>
  );
};

export default Home;


/*
import { useAuth } from "../../context/AuthContext"
import FooterBar from "../../components/FooterBar/FooterBar"
import './Home.scss'

const Home = () => {
  const { logout } = useAuth()

  return (
    <div className="container">
      <div className="content">
        <h1>Home Page</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <FooterBar />
    </div>
  )
}

export default Home
*/