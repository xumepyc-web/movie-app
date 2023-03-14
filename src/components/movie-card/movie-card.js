import React from 'react';
import PropTypes from 'prop-types';

import RateComponent from '../rate/rate';

import './movie-card.css';
const MovieCard = ({ id, title, poster, synopsis, releaseDate, rating }) => {
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
  const url = poster === null ? noPosterUrl : posterUrl;
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card" key={id}>
        <img className="movie-poster" src={url} alt="poster" />
        <ul className="movie-info">
          <li className="movie-name">
            <span>{title}</span>
            <span
              style={{
                marginLeft: '140px',
              }}
            >
              {rating.toFixed(1)}
            </span>
          </li>
          <li className="movie-release-date">{releaseDate}</li>
          <li className="movie-genre">Drama</li>
          <li className="movie-synopsis">{synopsisShortening(synopsis)}</li>
          <li className="movie-rate">
            <RateComponent />
          </li>
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
  releaseDate: PropTypes.string.isRequired,
};

export default MovieCard;
