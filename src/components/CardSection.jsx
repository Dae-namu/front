import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const sections = [
  {
    title: '믿고 보는 뒈이브 에디터 추천작',
    images: [
      'https://github.com/rraassa/img/blob/main/goblin_2_3_ratio.png?raw=true',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202307/1689835478005417020.webp',
      'https://image.tving.com/ntgs/contents/CTC/caip/CAIP0900/ko/20220205/P001561371.jpg/dims/resize/F_webp,480',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/K02_T2015-0294-Vertical_LogoY.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202411/1730969986176521229.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/BMS/TVSeason/2022/S01_P455166222-Vertical_LogoY.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202409/1726468505828994516.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/meta/image/202505/1746754950390944990.webp',
    ],
  },
  {
    title: '실시간 인기 콘텐츠',
    images: [
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575744825906.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575738644691.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575747720675.webp',
      'https://image.wavve.com/v1/thumbnails/480_720_20_80/operation/image/manualband/202504/1745980575754954048.webp',
      'https://i.namu.wiki/i/GlU0KVH2K7e6PyNyBFFL8VBt921yt5HA6yUj7HI3FRWSkIYVQjU2T1dsjh0Mu7X9GDSrn97lcinBdvMcGnEvIEi5FKOXdgroc6xktQGifC0iRKcjRQeFcnDMFrbLRvefYV0LiVGI5LyxRgOH0kauXA.webp',
      'https://i.namu.wiki/i/W8FRyCbxuUR4C7PeMzV3mDHTlYNr2xSPT-mM10UTPAv-Znwt_lvx4H0PoBvxzQujmSp_zUSTo5CsVQmuXuR0WoFCTOTe03daweDIBxC_eUlGn2WkG2jdtu7pGGfonfKtdsHqj5JtYokjHZgGEafnpA.webp',
      'https://i.namu.wiki/i/08p6GDjoK9srghoEefWWjVoh68B4I-cOBouuPrQzz8yGQapRuWDLpvhLGqESxJ4tCDGl1skCQRXCVhn4XAarEznUPxZ1lkFGTRgoKbPnvtTVYGWbsAyM16ZkmCnlFK6N8V3JA3aYmZV_FYEKenufHw.webp',
      'https://i.namu.wiki/i/s2J_n-GelyNanUQKtBB6AgpBrFmo9fLTiHA48fjQe62VRE5_eidmp11OCsuVRnA4_tSv63gJyB5p-RC_IU_S8C9VZIe7mKCKzpfU8FlQK1ES7IwgYknhNQ0wNQVw1qxuWB3piNXs2LCOobnvCeXk6w.webp',
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
