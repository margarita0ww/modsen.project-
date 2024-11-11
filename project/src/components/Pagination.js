import React, { useState } from 'react';

const Pagination = ({ onLoadMore }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onLoadMore();
    setTimeout(() => setLoading(false), 500); // Имитация задержки для визуального эффекта
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <button 
        className={`btn ${loading ? "btn-secondary" : "btn-primary"} px-4`} 
        onClick={handleClick} 
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Показать больше"}
      </button>
    </div>
  );
};

export default Pagination;
