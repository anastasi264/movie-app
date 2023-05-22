// const API_KEY = 'k_vw1tbl11';
// const API_KEY = '/dae585b93ca42906ee03a3d410e7eb8a';

// const BASE_URL = `https://imdb-api.com/en/API`;
const BASE_URL = `https://api.themoviedb.org/3`;

// fetch('https://api.themoviedb.org/3/discover/movie', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const request = (endpoint: string, options?: any) => {
  const url = BASE_URL + endpoint;

  return fetch(`${url}${options ? `?${new URLSearchParams(options)}` : ''}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU1ODViOTNjYTQyOTA2ZWUwM2EzZDQxMGU3ZWI4YSIsInN1YiI6IjY0NWUzMDZkZWY4YjMyMDE3MjYyZjBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f05Su3rPcePhHE5ygQsvrPhK_1-ILVNI7_7vYVVyxhc'
    }}
    ).then(response => {
      if (!response.ok) {
        throw new Error (`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

export const api = {
  get: {
    popularMovies: () => request('/movie/popular', {page: '1'}),
    tvSeriesAircoming: () => request('/tv/top_rated', {page: '1'}),
    upcoming: () => request('/discover/movie', {page: '1', sort_by: 'primary_release_date.desc'}),
    peopleLike: () => request('/person/popular', {page: '1'}),
    trailer: (id: number) => request(`/movie/${id}/videos`),
    discoverMovies: (page: string | number) => request(`/discover/movie`, {page}),
    discoverTvs: (page: string | number) => request(`/discover/tv`, {page}),
    movieContent: (id: number) => request(`/movie/${id}`, {append_to_response: 'credits,videos,images,similar'}),
    serieContent: (id: number) => request(`/tv/${id}`, {append_to_response: 'credits,videos,images,similar'}),

  }
};




