import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CardSection = () => {
  const [sections, setSections] = useState([]);
  const sliderRefs = useRef([]);
  const navigate = useNavigate();

  // ✅ API 호출 + 하드코딩된 타이틀 추가
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dramas');
        const data = await response.json();

        const updatedSections = [
          {
            title: '믿고 보는 뒈이브 에디터 추천작',
            items: data.slice(0, 1),
          },
          {
            title: '실시간 인기 콘텐츠',
            items: data.slice(1),
          }
        ];

        setSections(updatedSections);
      } catch (error) {
        console.error('dramas API 호출 실패:', error);
      }
    };

    fetchData();
  }, []);

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

          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={() => scroll(sectionIndex, 'left')}
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={() => scroll(sectionIndex, 'right')}
          >
            <FaChevronRight />
          </button>

          <div
            ref={(el) => (sliderRefs.current[sectionIndex] = el)}
            className="scrollbar-fix-container flex flex-nowrap gap-4 overflow-x-auto pr-16"
          >
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="relative w-60 h-80 flex-shrink-0 overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => {
                  sessionStorage.removeItem(`played_${item.id}`);
                  navigate(`/log/${item.id}`, {
                    state: {
                      id: item.id,
                      title: item.title,
                      description: item.description,
                      backgroundImageUrl: item.backgroundImageUrl,
                      episodes: item.episodes,
                      fromLocal: true,
                    },
                  });
                }}
              >
                <img
                  src={item.thumbnailUrl || 'https://via.placeholder.com/240x320'}
                  alt={`card-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
