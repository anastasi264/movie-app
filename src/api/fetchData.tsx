const BASE_URL = 'https://api.themoviedb.org/3';
const access_token= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWU1ODViOTNjYTQyOTA2ZWUwM2EzZDQxMGU3ZWI4YSIsInN1YiI6IjY0NWUzMDZkZWY4YjMyMDE3MjYyZjBhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f05Su3rPcePhHE5ygQsvrPhK_1-ILVNI7_7vYVVyxhc';

// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const request = (
  endpoint: string,
  searchParams: any | null = null,
  method: RequestMethod = 'GET',
  data: Record<string, unknown> | null = null,
) => {
  const url = BASE_URL + endpoint;
  
  const options: RequestInit = {
    method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}` 
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(`${url}${searchParams ? `?${new URLSearchParams(searchParams)}` : ''}`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error (`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

export const api = {
  get: { 
    media: {
      popularMovies: () => request('/movie/popular', {page: '1'}),
      tvSeriesAircoming: () => request('/tv/top_rated', {page: '1'}),
      upcoming: () => request('/discover/movie', {page: '1', sort_by: 'primary_release_date.desc'}),
      nowPlaying: () => request('/movie/now_playing', {page: '1'}),

      discoverMovies: (params: Record<string, string>) => request(`/discover/movie`, params),
      discoverTv: (params: Record<string, string>) => request(`/discover/tv`, params),

      movieContent: (id: number) => request(`/movie/${id}`, {append_to_response: 'credits,videos,images,similar'}),
      tvContent: (id: number) => request(`/tv/${id}`, {append_to_response: 'credits,videos,images,similar'}),
      trailer: (id: number) => request(`/movie/${id}/videos`),

      genres: (type: "movie" | "tv") => request(`/genre/${type}/list`),

      search: (query: string, page: number | string) => request("/search/multi", {page, query}),
    },

    authentication : {
      token: () => request('/authentication/token/new'),
    },

    account: {
      accountDetails: (id: string) => request(`/account/19436367`, {session_id: id}),
      favourites: (type: 'movies' | 'tv', id: string, page: string = '1') => request(
        `/account/19436367/favorite/${type}?language=en-US&page=${page}&session_id=${id}&sort_by=created_at.desc`
      ),
      watchlist: (type: 'movies' | 'tv', id: string, page: string = '1') => request(
        `/account/19436367/watchlist/${type}?language=en-US&page=${page}&session_id=${id}&sort_by=created_at.desc`
      ),
    },
  },

  post: {
    authentication: {
      validateUser: (data: Record<string, unknown>) => request('/authentication/token/validate_with_login', null, 'POST', data),
      createSession: (data: Record<string, unknown>) => request('/authentication/session/new', null, 'POST', data),
    },
    account: {
      changeFavourites: (id: string, data: Record<string, unknown>) => request(`/account/19436367/favorite?session_id=${id}`, null, 'POST', data),
      changeWatchlist: (id: string, data: Record<string, unknown>) => request(`/account/19436367/watchlist?session_id=${id}`, null, 'POST', data),
    },
  },

  delete: {
    session: (data: any) => request('/authentication/session', null, 'DELETE', data),
  },
};




