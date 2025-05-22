import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const sections = [
  {
    title: '믿고 보는 웨이브 에디터 추천작',
    images: [
      'https://private-user-images.githubusercontent.com/194181560/445934244-3861967b-eaf8-4130-960f-63fa8e8a1afb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDc4MDk2NDgsIm5iZiI6MTc0NzgwOTM0OCwicGF0aCI6Ii8xOTQxODE1NjAvNDQ1OTM0MjQ0LTM4NjE5NjdiLWVhZjgtNDEzMC05NjBmLTYzZmE4ZThhMWFmYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyMVQwNjM1NDhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hMGFlODQ3ZTZkOGI3NGY5MGM4NzVjMWRhZmZjNDViZGE2MTMyZDRkOGE2YzExZDU4YWNmOGE1MGNmM2M0NDM4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.7B4SFLzbNeLfy-KlnszV0wZ_W312mL9AROu__LMz5io',
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
