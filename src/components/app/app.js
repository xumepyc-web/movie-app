import React, { Component } from 'react';
import { format } from 'date-fns';

import Spinner from '../loader/spinner';
import './app.css';
import MovieService from '../../services/movie-service';
import MovieCard from '../movie-card/movie-card';
export default class App extends Component {
  constructor() {
    super();
    this.updateMovie();
  }
  state = {
    moviesData: [],
    loading: true,
  };
  movieService = new MovieService();

  updateMovie() {
    this.movieService.getMovie().then((movies) => {
      this.setState({
        moviesData: movies,
        loading: false,
      });
    });
  }
  setReleaseDate(date) {
    const altDate = 'Release date unknown';
    if (date === '') {
      return altDate;
    }
    return format(new Date(date), 'MMMM dd, yyyy');
  }
  render() {
    const { moviesData, loading } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <div className="app-container">
        {moviesData.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              synopsis={movie.overview}
              releaseDate={this.setReleaseDate(movie.release_date)}
              id={movie.id}
              title={movie.title}
              poster={movie.poster_path}
            />
          );
        })}
      </div>
    );
  }
}
