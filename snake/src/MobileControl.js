import React from 'react';
import './App.css';

const MobileControls = ({ handleMove }) => {
  return (
    <div className="mobile-controls-container">
      <div className="mobile-control-row">
        <div onClick={() => handleMove('up')} className="mobile-control">
          ▲
        </div>
      </div>
      <div className="mobile-control-row">
        <div onClick={() => handleMove('left')} className="mobile-control">
          ◄
        </div>
        <div onClick={() => handleMove('right')} className="mobile-control">
          ►
        </div>
      </div>
      <div className="mobile-control-row">
        <div onClick={() => handleMove('down')} className="mobile-control">
          ▼
        </div>
      </div>
    </div>
  );
};

export default MobileControls;