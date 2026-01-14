import React, { useState } from 'react';
import './../styles/App.css';

const api = '99eb9fd1';

const App = () => {
  const [movieData, setMovieData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${api}&s=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === 'True') {
          setMovieData(data.Search);
        } else {
          setError('Invalid movie name. Please try again.');
        }
      })
      .catch((err) => {
        setError('Invalid movie name. Please try again.');
        setLoading(false);
      });
  };

  console.log(movieData);
  return (
    <div>
      <p>Search Movie</p>
      <form onSubmit={handleSearch}>
        <input
          id="search"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {movieData && (
        <ul>
          {movieData.map((movie) => (
            <li
              key={movie.imdbID}
              className="movie-card"
            >
              <img
                src={
                  movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
