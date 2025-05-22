import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // ✅ 추가

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white relative z-50">
      {/* ✅ 클릭 시 메인으로 이동 */}
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Davve
      </div>

      <div
        className="relative"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <FaUserCircle className="text-3xl cursor-pointer" />
        {isDropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-sm text-white shadow-lg rounded-md py-2 z-50">
            <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">로그인</div>
            <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">이용권 <span className="text-xs text-gray-400">0</span></div>
            <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">쿠폰 등록</div>
            <div className="px-4 py-2 hover:bg-gray-800 cursor-pointer">고객센터</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
