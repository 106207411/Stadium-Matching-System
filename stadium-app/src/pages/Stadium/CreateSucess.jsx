import React, { useState } from 'react';
import './CreateSucess.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';

const CreateSucess = () => {
  return (
    <div>
      <Header title="創建活動" showSortIcon={true} />
      <div className="centered-textbox">
            <div className="label">你的預約編號</div>
              <div className="label">XXX</div>
                <div className="label">已經建立</div>
          <button className="submit-button">查看預約</button>
          <button className="submit-button">返回主頁</button>
        <FooterBar />
      </div>
    </div>
  );
};

export default CreateSucess;
