import React, { useRef } from 'react';

const images = [
  'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202504/1744941557751502488.webp',
  'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202410/1728563706398328256.webp',
  'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730971898240372044.webp',
  'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730969986176521229.webp',
  'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202505/1746754950390944990.webp',
];

const TestSlider = () => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const amount = clientWidth * 0.8;
    scrollRef.current.scrollTo({
      left: dir === 'left' ? scrollLeft - amount : scrollLeft + amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full px-6 py-10 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">🔥 슬라이드 테스트</h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-full z-10"
        >
          ◀
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-70 text-white px-3 py-2 rounded-full z-10"
        >
          ▶
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scroll-smooth pr-20"
          style={{ whiteSpace: 'nowrap' }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="inline-block w-60 h-80 bg-gray-900 flex-shrink-0 rounded-lg overflow-hidden"
            >
              <img src={img} alt={`poster-${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestSlider;
