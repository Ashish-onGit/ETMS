import React from 'react';

const QRCode = () => {
  return (
    <div className="w-64 h-64 bg-white border border-gray-300 rounded-lg shadow-md p-2 grid grid-cols-21 grid-rows-21 gap-[1px]">
      {[...Array(441)].map((_, i) => {
        // Define positions for the 3 large corner squares
        const row = Math.floor(i / 21);
        const col = i % 21;

        const isTopLeft = row < 7 && col < 7;
        const isTopRight = row < 7 && col > 13;
        const isBottomLeft = row > 13 && col < 7;

        const isCorner = isTopLeft || isTopRight || isBottomLeft;

        return (
          <div
            key={i}
            className={`w-full h-full ${
              isCorner
                ? 'bg-black'
                : Math.random() > 0.5
                ? 'bg-black'
                : 'bg-white'
            }`}
          />
        );
      })}
    </div>
  );
};

export default QRCode;
    