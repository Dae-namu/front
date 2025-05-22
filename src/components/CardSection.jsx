import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const sections = [
  {
    title: '믿고 보는 웨이브 에디터 추천작',
    images: [
      'https://github.com/rraassa/img/blob/main/goblin_2_3_ratio.png?raw=true',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202410/1728563706398328256.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730971898240372044.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/K02_T2015-0294-Vertical_LogoY.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730969986176521229.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/S01_P455166222-Vertical_LogoY.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202409/1726468505828994516.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202505/1746754950390944990.webp',
    ],
  },
  {
    title: '사랑을 찾아가는 여자들의 이야기',
    images: [
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575744825906.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575738644691.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575747720675.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575754954048.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575752956885.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575756587630.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575749789794.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575732888687.webp',
    ],
  },
];

const CardSection = () => {
  const sliderRefs = useRef([]);
  const navigate = useNavigate();

  const scroll = (index, direction) => {
    const slider = sliderRefs.current[index];
    if (slider) {
      const { scrollLeft, clientWidth } = slider;
      const scrollAmount = clientWidth * 0.8;
      slider.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="px-6 space-y-12 my-10 overflow-x-hidden">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="relative">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className="absolute right-0 top-10 w-16 h-80 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={() => scroll(sectionIndex, 'left')}>
            <FaChevronLeft />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={() => scroll(sectionIndex, 'right')}>
            <FaChevronRight />
          </button>

          <div
            ref={(el) => (sliderRefs.current[sectionIndex] = el)}
            className="scrollbar-fix-container flex flex-nowrap gap-4 overflow-x-auto pr-16"
            style={{ scrollBehavior: 'smooth' }}
          >
            {section.images.map((src, idx) => {
              const isFirst = sectionIndex === 0 && idx === 0;
              return (
                <div
                  key={idx}
                  className="relative w-60 h-80 flex-shrink-0 overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => {
                    if (isFirst) {
                      sessionStorage.removeItem('played_도깨비');
                      navigate('/log/도깨비', { state: { fromLocal: true } });
                    }
                  }}
                >
                  <img
                    src={src}
                    alt={`card-${idx}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
