import React, { useEffect, useState } from 'react';

const images = [
  'https://cms.korean-culture.org/CONTENTS/editImage/2024/06/18/20240618081359844108.jpg',
  'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2017/06/19/uiTSrI1LxBKP636334875723491421.jpg',
  'https://cdnweb01.wikitree.co.kr/webdata/editor/202411/23/img_20241123095654_61f31bfd.webp',
  'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202301/19/41766a50-baa6-4dbc-a501-f8ddcb9fee89.jpg',
];

const MainSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const getStyle = (index) => {
    if (index === current) {
      return {
        width: '70%',
        zIndex: 20,
        transform: 'translateX(-50%) scale(1)',
        opacity: 1,
      };
    }
    if (index === (current - 1 + length) % length) {
      return {
        width: '40%',
        zIndex: 10,
        transform: 'translateX(-150%) scale(0.95)',
        opacity: 0.9,
      };
    }
    if (index === (current + 1) % length) {
      return {
        width: '40%',
        zIndex: 10,
        transform: 'translateX(50%) scale(0.95)',
        opacity: 0.9,
      };
    }
    return {
      width: '0%',
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden flex justify-center items-center">
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            style={getStyle(index)}
            className={`absolute top-0 left-1/2 h-full object-cover rounded-xl transition-all duration-700 ease-in-out`}
          />
        ))}
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-30">
        {current + 1} / {length}
      </div>
    </div>
  );
};

export default MainSlider;
