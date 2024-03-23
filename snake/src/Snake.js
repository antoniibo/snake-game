import React from 'react';

const Snake = ({ segments }) => {
    return (
      <div className="snake-container">
        {segments.map((segment, index) => (
          <div key={index} className="snake-segment"></div>
        ))}
      </div>
    );
  };
  
export default Snake;