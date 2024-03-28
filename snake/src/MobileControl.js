import React from 'react';

const MobileControls = ({ handleMove }) => {
  return (
    <div>
      <div onClick={() => handleMove('up')} style={{ fontSize: '2em', cursor: 'pointer' }}>
        ▲
      </div>
      <div onClick={() => handleMove('left')} style={{ fontSize: '2em', cursor: 'pointer' }}>
        ◄
      </div>
      <div onClick={() => handleMove('right')} style={{ fontSize: '2em', cursor: 'pointer' }}>
        ►
      </div>
      <div onClick={() => handleMove('down')} style={{ fontSize: '2em', cursor: 'pointer' }}>
        ▼
      </div>
    </div>
  );
};

export default MobileControls;