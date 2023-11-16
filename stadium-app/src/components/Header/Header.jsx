// import { useState, useEffect } from "react"
// import './Header.scss'

// const Header = () => {

// }

// export default Header


import React from 'react';
import './Header.scss'; 

// const Header = () => {
//   return (
//     <header className="header">
//       <img src="/left.png" alt="Left" className="header-icon" />
//       <h1 className="header-title">場地</h1>
//       <img src="/updown.png" alt="Up and Down" className="header-icon" />
//     </header>
//   );
// };



const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header-icon">
        <img src="/left.png" alt="Left" />
      </div>
      <h1 className="header-title">{title}</h1>
      <div className="header-icon right">
        <img src="/updown.png" alt="Up and Down" />
      </div>
    </header>
  );
};

export default Header;
