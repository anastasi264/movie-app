/* eslint-disable react-hooks/exhaustive-deps */
// react
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// api
import { api } from "../../api/fetchData";

// types
import { Movie } from "../../types/Movie";
import { TV } from "../../types/TV";

// components
import { ItemInfo } from "../../components/common/Item/ItemInfo";
import { ModalError } from "../../components/common/Modal/ModalError";
import { getTvYears, getYearFromFullDate } from "../../utils/helpers/filterItems";
import { Loader } from "../../components/common/Loader/Loader";


export const ItemPage = () => {
  const [item, setItem] = useState<Movie | TV | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  
  const location = useLocation();
  const type = location.state.type;

  const fetchMovie = async() => {
    try {
      setLoading(true);
      let item;

      switch (type) {
        case 'movies':
          item = await api.get.media.movieContent(location.state.id);
          break;

        case 'tv':
          item = await api.get.media.tvContent(location.state.id);
          break;
      }
      setItem(item);
    } catch {
      setError(true);
    } finally {
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

  if (error) {
    return (
      <ModalError text="Sorry, your requested resource is not found."/>
    );
  }

  if (loading || !item) {
    return (
      <Loader />
    );
  }

  const { poster_path, id, tagline, genres, production_countries, credits, vote_average, vote_count, overview, images, videos, similar } = item;
  const year = type === 'movies'
    ? getYearFromFullDate((item as Movie).release_date)
    : getTvYears((item as TV).first_air_date, (item as TV).last_air_date);

  const itemInfoProps = {
    type,
    id,
    poster: poster_path,
    title: type === 'movies' ? (item as Movie).original_title : (item as TV).original_name,
    tagline,
    genres,
    year,
    time: type === 'movies' ? (item as Movie).runtime : (item as TV).episode_run_time[0],
    countries: production_countries,
    actors: credits.cast,
    rating: vote_average,
    votes: vote_count,
    overview,
    images: images.backdrops,
    trailer: videos.results[0],
    similars: similar.results,
  };

  return <ItemInfo {...itemInfoProps} />;
};
