export interface Movie {
  crew: string,
  fullTitle: string,
  id: string,
  imDbRating: string,
  imDbRatingCount: string,
  image: string,
  rank: string,
  title: string,
  year: string,
}

export interface Similars {
  adult: boolean,
  backdrop_path: string,
  genre_ids: [],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: string,
  poster_path: null,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  credits: {cast: CastMember[]};
  genres: Genre[];
  homepage: string;
  id: string;
  imdb_id: string;
  images: {backdrops: Image[];}
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Language[];
  status: string;
  similar: {page: number, results: any[], total_pages: number, total_results: number};
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
}


export interface Series {
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
  type: string;
  videos: {results: any[]};
  vote_average: number;
  vote_count: number;
}
