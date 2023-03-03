import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.css';
const MovieCard = ({ id, title, poster, synopsis, releaseDate }) => {
  const synopsisShortening = (text) => {
    if (text.length > 200) {
      let newText = text.slice(0, 200).split(' ');
      let arr = newText.map((el) => el + ' ');
      let result = arr.slice(0, -1);
      return [...result, '...'];
    }
    return text;
  };
  const noPosterUrl = 'https://image.tmdb.org/t/p/original//uc4RAVW1T3T29h6OQdr7zu4Blui.jpg';
  const posterUrl = `https://image.tmdb.org/t/p/original/${poster}`;
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card" key={id}>
        <img className="movie-poster" src={poster === null ? noPosterUrl : posterUrl} alt="poster" />
        <ul className="movie-info">
          <li className="movie-name">{title}</li>
          <li className="movie-release-date">{releaseDate}</li>
          <li className="movie-genre">Drama</li>
          <li className="movie-synopsis">{synopsisShortening(synopsis)}</li>
        </ul>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string,
  synopsis: PropTypes.string.isRequired,
  releaseDate: PropTypes.any,
};

export default MovieCard;
