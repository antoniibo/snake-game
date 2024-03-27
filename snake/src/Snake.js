import React from 'react';

const Snake = ({ segments }) => {
    return (
        <>
            {segments.map((segment, index) => (
                <div
                    key={index}
                    className="snake-segment"
                    style={{
                        gridColumn: segment.x + 1,
                        gridRow: segment.y + 1,
                        backgroundColor: 'green',
                        border: '1px solid #fff',
                    }}
                ></div>
            ))}
        </>
    );
};

export default Snake;