import React from 'react';
import './ConfirmModal.scss'; // Add your styles here


const ConfirmModal = ({ onConfirm, onCancel }) => {
    return (
      <div className="confirmation-modal">
        <div className="modal-content">
          <h2>確認送出？</h2>
          <div className="confirmation-buttons">
            <button onClick={onConfirm} className="confirm-btn">是</button>
            <button onClick={onCancel} className="cancel-btn">否</button>
          </div>
        </div>
      </div>
    );
  };
  

  export default ConfirmModal;