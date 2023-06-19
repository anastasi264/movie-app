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
  type: "movies",
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  credits: {cast: CastMember[]};
  genres: Genre[];
  homepage: string;
  id: number;
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
