import React from 'react';
import './ConfirmModal.scss'; // 确保您的样式文件已正确导入

const ConfirmModal = ({ onConfirm, eventName, people, level, description }) => {
    return (
        <div className="confirmation-modal">
            <div className="modal-content">
                <h2>確認預約</h2>
                <p>活動名稱: {eventName}</p>
                <p>人數上限: {people}</p>
                <p>擅長程度: {level}</p>
                <p>活動說明: {description}</p>
                <div className="confirmation-buttons">
                    <button onClick={onConfirm} className="confirm-btn">我好期待</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
