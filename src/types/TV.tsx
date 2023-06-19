export interface TV {
  type: "tv",
  adult: boolean;
  backdrop_path: string;
  created_by: {id: number, credit_id: string, name: string, gender: number}[];
  credits: any;
  episode_run_time: number[];
  first_air_date: string;
  genres: {id: number, name: string}[];
  homepage: string;
  id: number;
  images: any;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {id: number, name: string, overview: string, vote_average: number, vote_count: number, air_date: string};
  name: string;
  networks: {id: number, logo_path: string, name: string, origin_country: string}[];
  next_episode_to_air: {id: number, name: string, overview: string, vote_average: number, vote_count: number, air_date: string};
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {id: number, logo_path: string, name: string, origin_country: string}[];
  production_countries: {iso_3166_1: string, name: string}[];
  seasons: {air_date: string, episode_count: number, id: number, name: string, overview: string, poster_path: string}[];
  similar: {page: number, results: any[], total_pages: number, total_results: number};
  spoken_languages: {english_name: string, iso_639_1: string, name: string}[];
  status: string;
  tagline: string;
  videos: {results: any[]};
  vote_average: number;
  vote_count: number;
}
