import React from 'react';

const Card = ({ id, title, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <div>
        <h3>{title}</h3>
        <p>Click to View</p>
      </div>
    </div>
  );
};

export default Card;