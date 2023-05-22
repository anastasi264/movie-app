/* eslint-disable react-hooks/exhaustive-deps */
// react
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { movie } from "./testMovie";

// api
import { api } from "../../api/fetchData";

// types
import { Movie, Series } from "../../types/Movie";

// icons
import { ItemInfo } from "../../components/common/Item/ItemInfo";


export const ItemPage = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [series, setSeries] = useState<Series | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [erorr, setErorr] = useState<boolean>(false);
  
  const location = useLocation();
  const type = location.state.type;
  console.log(location)

  const fetchMovie = async() => {
    try {
      setLoading(true);
      switch (type) {
        case 'movies':
          const movie = await api.get.movieContent(location.state.id);
          setMovie(movie);
          break;

        case 'tv':
          const series = await api.get.serieContent(location.state.id);
          setSeries(series);
          break;
      }
    } catch {
      setErorr(true);
    } finally {
      setErorr(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    fetchMovie();
  }, [location.state.id]);

  return (
    <div className="">
      {movie && type === 'movies' && (
        <ItemInfo
          type={type}
          poster={movie.poster_path}
          title={movie.original_title}
          tagline={movie.tagline}
          genres={movie.genres}
          year={movie.release_date.slice(0, 4)}
          time={movie.runtime}
          countries={movie.production_countries}
          actors={movie.credits.cast}
          rating={movie.vote_average}
          votes={movie.vote_count}
          description={movie.overview}
          images={movie.images.backdrops}
          trailer={movie.videos.results[0]}
          similars={movie.similar.results}
        />
      )}

      {series && type === 'tv' && (
        <ItemInfo
          type={type}
          poster={series.poster_path}
          title={series.original_name}
          tagline={series.status}
          genres={series.genres}
          year={`${series.first_air_date.slice(0, 4)} / ${series.last_air_date.slice(0, 4)} `}
          time={series.episode_run_time[0]}
          countries={series.production_countries}
          actors={series.credits.cast}
          rating={series.vote_average}
          votes={series.vote_count}
          description={series.overview}
          images={series.images.backdrops}
          trailer={series.videos.results[0]}
          similars={series.similar.results}
        />
      )}
    </div>
  );
};
