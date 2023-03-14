import React, { Component } from 'react';
import { format } from 'date-fns';

import Spinner from '../loader/spinner';
import MovieService from '../../services/movie-service';
import ErrorIndicator from '../error-indicator/error-indicator';
import './app.css';
import SearchPanel from '../search-panel/search-panel';
import MovieCard from '../movie-card/movie-card';
import Message from '../message-indictor/message-indicator';
import Page from '../pagination/pagination';
export default class App extends Component {
  state = {
    moviesData: [],
    loading: true,
    error: false,
    searchValue: '',
    notFound: false,
    pageNum: 1,
    sessionId: null,
  };
  movieService = new MovieService();
  componentDidMount() {
    if (this.state.sessionId === null) {
      this.createSession();
    }
  }
  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.searchValue !== prevState.searchValue || this.state.pageNum !== prevState.pageNum) {
      this.updateMovie();
      this.setState({
        notFound: true,
      });
    }
  }
  createSession() {
    this.movieService.getSession().then((sessionId) => {
      this.setState({
        sessionId: sessionId.guest_session_id,
        loading: false,
      });
    });
  }
  updateMovie() {
    this.movieService
      .getMovie(this.state.searchValue, this.state.pageNum)
      .then((movies) => {
        this.setState({
          moviesData: movies,
          loading: false,
          error: false,
        });
      })
      .catch(this.onError);
    console.log(this.state.sessionId);
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
  changeValue = (text) => {
    this.setState({
      searchValue: text,
      loading: true,
    });
  };
  onChangePage = (page) => {
    this.setState({
      pageNum: page,
    });
  };
  render() {
    const { moviesData, loading, error, notFound } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const loader = loading ? <Spinner /> : null;
    const notResult = moviesData.length === 0 && notFound && !loader ? <Message /> : null;
    return (
      <section className="app-container">
        <SearchPanel changeValue={this.changeValue} />
        {notResult}
        {loader}
        {errorMessage}
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
                rating={movie.vote_average}
              />
            );
          })}
        </div>
        <Page onChangePage={this.onChangePage} />
      </section>
    );
  }
}
