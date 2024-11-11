import React from 'react';

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  const { title, imageLinks, authors = ['Неизвестно'], categories = ['Не указано'] } = volumeInfo;

  return (
    <div className="col-sm-6 col-md-4 mb-4">
      <div className="card h-100">
        {imageLinks?.thumbnail ? (
          <img src={imageLinks.thumbnail} alt={title} className="card-img-top" />
        ) : (
          <div className="card-img-top placeholder">Изображение недоступно</div>
        )}
        <div className="card-body">
          <h5 className="card-title">{title || 'Название не указано'}</h5>
          <p className="card-text">
            <strong>Авторы:</strong> {authors.join(', ')}
          </p>
          <p className="card-text">
            <strong>Категории:</strong> {categories[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
