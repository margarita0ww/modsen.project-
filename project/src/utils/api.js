import axios from 'axios';

const API_KEY = 'AIzaSyBazx0IQf9RMbKe5Gjl4yg98SjE0gFv3EE'; 
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooks = async (query, category, sort, startIndex = 0) => {
  try {
    const params = {
      q: query, // Текст поиска
      orderBy: sort, // Сортировка
      startIndex: startIndex, // Пагинация
      maxResults: 30, // Ограничение по количеству
      key: API_KEY, // Ваш API ключ
    };

    // Фильтрация по категории через subject
    if (category !== 'all') {
      params.q = `${query}+subject:${category}`;
    }

    console.log('Запрос к API:', params);

    const response = await axios.get(API_URL, { params });

    console.log('Ответ от API:', response.data);

    return response.data; // Возвращаем данные
  } catch (error) {
    console.error('Ошибка при загрузке данных с Google Books API:', error);

    if (error.response) {
      console.error('Ответ от сервера с ошибкой:', error.response.data);
    } else {
      console.error('Ошибка без ответа от сервера:', error.message);
    }

    throw new Error('Не удалось загрузить книги');
  }
};


// import axios from 'axios';

// const API_KEY = 'AIzaSyB-PJvJSqibUZMXVWLz6OYxN6LVXS170hI'; 
// const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// export const fetchBooks = async (query, category, sort, startIndex) => {
//   try {
//     // Логируем параметры запроса
//     console.log('Запрос к API:', {
//       q: query,
//       orderBy: sort,
//       startIndex: startIndex,
//       maxResults: 30,
//       key: API_KEY,
//       filter: category !== 'all' ? category : undefined, // Не передаем filter, если категория 'all'
//     });

//     const params = {
//       q: query,
//       orderBy: sort,
//       startIndex: startIndex,
//       maxResults: 30,
//       key: API_KEY,
//     };

//     if (category !== 'all') {
//       params.filter = category;  // Добавляем filter, если категория не 'all'
//     }

//     const response = await axios.get(API_URL, { params });

//     // Логируем успешный ответ
//     console.log('Ответ от API:', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('Ошибка при загрузке данных с Google Books API:', error);

//     // Логируем ошибку
//     if (error.response) {
//       console.error('Ответ от сервера с ошибкой:', error.response.data);
//     } else {
//       console.error('Ошибка без ответа от сервера:', error.message);
//     }
//     throw new Error('Не удалось загрузить книги');
//   }
// };

