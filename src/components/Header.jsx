import React, { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white relative z-50">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        <span className="text-green-500">D</span>avve
      </div>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaUserCircle className="text-3xl cursor-pointer" />

        <div
          className={`absolute right-0 mt-2 w-48 bg-gray-900 text-sm text-white shadow-lg rounded-md py-2 z-50 transition-all duration-200 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">로그인</div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
            이용권 <span className="text-xs text-gray-400">0</span>
          </div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">쿠폰 등록</div>
          <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">고객센터</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
