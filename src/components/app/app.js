import React, { Component } from 'react';
import { format } from 'date-fns';
import { Online, Offline } from 'react-detect-offline';

import Spinner from '../loader/spinner';
import MovieService from '../../services/movie-service';
import MovieCard from '../movie-card/movie-card';
import ErrorIndicator from '../error-indicator/error-indicator';
import './app.css';
export default class App extends Component {
  constructor() {
    super();
    this.updateMovie();
  }
  state = {
    moviesData: [],
    loading: true,
    error: false,
  };
  movieService = new MovieService();

  updateMovie() {
    this.movieService
      .getMovie()
      .then((movies) => {
        this.setState({
          moviesData: movies,
          loading: false,
        });
      })
      .catch(this.onError);
  }
  setReleaseDate(date) {
    const altDate = 'Release date unknown';
    if (date === '') {
      return altDate;
    }
    return format(new Date(date), 'MMMM dd, yyyy');
  }
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  render() {
    const { moviesData, loading, error } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    if (loading) {
      return <Spinner />;
    }
    return (
      <section className="app-container">
        <Online>
          <form className="search-panel-form">
            <input className="search-panel" placeholder="Type to search..." />
          </form>
          <div className="movie-card-list">
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
          {errorMessage}
        </Online>
        <Offline>
          <ErrorIndicator />
        </Offline>
      </section>
    );
  }
}
