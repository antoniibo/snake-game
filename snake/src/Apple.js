import React from 'react';

const Apple = ({ x, y }) => {
    return (
        <div
            className="apple"
            style={{
                gridColumn: x + 1,
                gridRow: y + 1,
                backgroundColor: 'red',
                border: '1px solid #fff',
                borderRadius: '50%',
            }}
        ></div>
    );
};

export default Apple;