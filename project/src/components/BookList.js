import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "./SearchForm";
import BookCard from "./BookCard";
import Pagination from "./Pagination";

const API_KEY = "AIzaSyBazx0IQf9RMbKe5Gjl4yg98SjE0gFv3EE"; // Ваш ключ API
const API_URL = "https://www.googleapis.com/books/v1/volumes";

const BookList = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Используем для пагинации
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        q: query || "programming", // Задаем значение по умолчанию
        filter: category !== "all" ? category : undefined,
        orderBy: sort === "newest" ? "newest" : undefined,
        startIndex,
        maxResults: 12,
        key: API_KEY,
      };

      const response = await axios.get(API_URL, { params });
      setBooks((prevBooks) => [...prevBooks, ...(response.data.items || [])]); // Добавляем к текущему списку
      setStartIndex((prevIndex) => prevIndex + 12); // Увеличиваем стартовый индекс
    } catch (error) {
      console.error("Ошибка загрузки книг:", error);
      if (error.response?.status === 403) {
        console.error("Проблема с API-ключом: возможно, превышен лимит или ключ неверен.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query || category !== "all") {
      fetchBooks();
    }
  }, [query, category, sort]);

  const handleLoadMore = () => {
    fetchBooks();
  };

  return (
    <div className="container mt-5">
      <SearchForm
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      <div className="row">
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      {books.length > 0 && !loading && (
        <Pagination onLoadMore={handleLoadMore} />
      )}
    </div>
  );
};

export default BookList;
