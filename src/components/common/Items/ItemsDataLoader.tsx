/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// api
import { api } from "../../../api/fetchData";
// types
import { Movie } from "../../../types/Movie";
import { TV } from "../../../types/TV";
import { Multi } from "../../../types/Multi";
// components
import { capitalizeFirstLetter } from "../../../utils/helpers/stringMethods";
import { ModalError } from "../Modal/ModalError";
import { Loader } from "../Loader/Loader";
import { ItemsList } from "./ItemsList";
import { NotFound } from "../NotFound/NotFound";
import { MdOutlineSearchOff } from "react-icons/md";


type Props = {
  type: 'movies' | 'tv' | 'multi',
};

export const ItemsDataLoader: React.FC<Props> = ({ type }) => {
  const [items, setItems] = useState<Movie[] | TV[] | Multi[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(10);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const sort = searchParams.get('sort') || 'vote_count.desc';
  const genre = searchParams.get('genre') || '';
  const year = searchParams.get('year') || '';
  const query = searchParams.get('query') || '';
  
  const params = {
    page,
    sort_by: sort,
    with_genres: genre,
    ...(type === 'movies' ? { primary_release_year: year } : { first_air_date_year: year }),
  };

  const fetchMovies = async() => {
    try {
      setLoading(true);
      let itemsFromServer;

      switch (type) {
        case 'movies':
          itemsFromServer = await api.get.media.discoverMovies(params);
          setItems(itemsFromServer.results.map((item: Movie) => {
            return {
              ...item,
              type,
            };
          }));
          break;
        
        case 'tv':
          itemsFromServer = await api.get.media.discoverTv(params);
          setItems(itemsFromServer.results.map((item: TV) => {
            return {
              ...item,
              type,
            };
          }));
          break;

        case 'multi':
          itemsFromServer = await api.get.media.search(query, page);
          setItems(itemsFromServer.results.map((item: Multi) => {
            return {
              ...item,
              type: item.media_type === 'movie' ? 'movies' : 'tv',
            };
          }));
          break;
      }
      const pages = itemsFromServer.total_pages;
      pages > 500 ? setTotalPages(500) : setTotalPages(pages);

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
  
    fetchMovies();
  }, [searchParams]);

  
  if (error) {
    return (
      <ModalError text="Sorry, your requested resource is not found."/>
    );
  }

  if (loading) {
    return (
      <Loader />
    );
  }

  if (items.length === 0) {
    return (
      <NotFound 
        text="No results found for your search. Please try again!"
        icon={<MdOutlineSearchOff />}
      />
    );
  }

  const title = query
    ? `Search Results «${query}»` 
    : `Discover ${capitalizeFirstLetter(type)}`;

  return (
    <ItemsList
      items={items}
      totalPages={totalPages}
      title={title}
      params={params}
      filterItems={!query}
    />
  );
};
