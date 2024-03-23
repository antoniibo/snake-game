import React from 'react';

const Apple = ({ position }) => {
  return (
    <div className="apple" style={{ gridRow: position.y + 1, gridColumn: position.x + 1 }}>
      {/* You can add content or leave it empty for a styled representation */}
    </div>
  );
};

export default Apple;