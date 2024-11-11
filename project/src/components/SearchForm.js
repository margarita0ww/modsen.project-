import React, { useState } from 'react';

const SearchForm = ({ query = "", setQuery, category = "all", setCategory, sort = "relevance", setSort, onSearch }) => {
  const [error, setError] = useState(""); // Для обработки ошибок
  const [isSearching, setIsSearching] = useState(false); // Для анимации загрузки

  // Обработка нажатия клавиши Enter или кнопки поиска
  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Пожалуйста, введите текст для поиска.");
      return;
    }
    setError("");
    setIsSearching(true);
    onSearch();
    setTimeout(() => setIsSearching(false), 500); // Имитация анимации
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        placeholder="Поиск книг..."
        className="form-control"
        onChange={({ target }) => setQuery(target.value)}
        onKeyDown={handleKeyPress}
      />
      {error && <p className="error-text">{error}</p>}
      
      <select
        value={category}
        className="form-control"
        onChange={({ target }) => {
          setCategory(target.value);
          onSearch();
        }}
      >
        {["all", "art", "biography", "computers", "history", "medical", "poetry"].map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <select
        value={sort}
        className="form-control"
        onChange={({ target }) => {
          setSort(target.value);
          onSearch();
        }}
      >
        <option value="relevance">relevance</option>
        <option value="newest">newest</option>
      </select>
      
      <button onClick={handleSearch} className="btn btn-primary ml-2">
        {isSearching ? "Поиск..." : "Поиск"}
      </button>
    </div>
  );
};

export default SearchForm;
