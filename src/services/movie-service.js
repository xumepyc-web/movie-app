export default class MovieService {
  _api = 'https://api.themoviedb.org/3';
  _apiKey = '67d3b334dd26de18dce45fc60e84b4ba';
  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + ` received ${res.status}`);
    }
    return await res.json();
  }
  async getMovie(searchWord, page) {
    const res = await this.getResource(
      `${this._api}/search/movie?api_key=${this._apiKey}&language=en-US&query=${searchWord}&page=${page}&include_adult=false`
    );
    return res.results;
  }
  async getSession() {
    return await this.getResource(`${this._api}/authentication/guest_session/new?api_key=${this._apiKey}`);
  }
}
