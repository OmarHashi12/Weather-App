import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsDisplay = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const API_KEY = 'NFbtYdN4BiCv3HoMcYTAZEFMVKhacZYO';
      try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`);
        setArticles(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-display">
      <h2>Top News</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default NewsDisplay;
