export default class MovieService {
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + ` received ${res.status}`);
    }
    return await res.json();
  }

  async getMovie(searchWord, page) {
    const res = await this.getResource(`
https://api.themoviedb.org/3/search/movie?api_key=67d3b334dd26de18dce45fc60e84b4ba&language=en-US&query=${searchWord}&page=${page}&include_adult=false`);
    return res.results;
  }
}
