import React from 'react';

const HoverZoomImage = ({ src, alt = 'image', width = 'w-60', height = 'h-80' }) => {
  return (
    <div className={`overflow-hidden rounded-lg ${width} ${height}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
      />
    </div>
  );
};

export default HoverZoomImage;
