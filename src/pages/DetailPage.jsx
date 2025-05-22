// src/pages/DetailPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">상세 페이지</h1>
      <p className="text-xl">선택된 ID: <span className="text-blue-400">{id}</span></p>
    </div>
  );
};

export default DetailPage;
