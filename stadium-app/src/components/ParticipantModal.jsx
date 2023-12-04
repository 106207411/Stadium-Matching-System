import React from 'react';
import './ParticipantModal.scss'; // Add your styles here

const ParticipantModal = ({ users, onClose }) => {
  return (
    <div className="participant-modal">
      <div className="modal-content">
        <h2>Participants</h2>
        <div className="participants-list">
          {users.map(user => (
            <div key={user.user_id} className="participant">
              <img src={user.picture} alt={user.Name} />
              <p>{user.Name}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ParticipantModal;
