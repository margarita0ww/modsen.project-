import React, { useState, useEffect, useCallback } from 'react';
import { fetchBooks } from './utils/api'; // Импорт функции для работы с API
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [error, setError] = useState('');

  // Функция поиска книг с использованием useCallback
  const handleSearch = useCallback(async () => {
    if (!query.trim()) return; // Проверка на пустую строку

    setLoading(true);
    setError('');
    try {
      const data = await fetchBooks(query, category, sort, startIndex);
      setBooks((prevBooks) => startIndex === 0 ? data.items || [] : [...prevBooks, ...(data.items || [])]); // Добавляем к текущему списку для пагинации
      setTotalItems(data.totalItems);
    } catch {
      setError('Не удалось загрузить данные. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  }, [query, category, sort, startIndex]);

  // Обработчик для загрузки дополнительной страницы
  const loadMoreBooks = useCallback(() => {
    setStartIndex((prevIndex) => prevIndex + 30); // Загрузить следующие 30 элементов
  }, []);

  // Обновляем список книг при изменении параметров поиска
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="container">
      <SearchForm
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        onSearch={() => setStartIndex(0)} // Сброс индекса при новом поиске
      />
      {loading && <div className="loading-text">Загрузка...</div>}
      {error && <div className="error-message">{error}</div>}
      <h3 className="results-count">{totalItems} результатов</h3>
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
      {totalItems > books.length && !loading && (
        <Pagination onLoadMore={loadMoreBooks} />
      )}
    </div>
  );
};

export default App;
