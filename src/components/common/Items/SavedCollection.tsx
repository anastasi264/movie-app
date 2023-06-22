/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { ModalError } from "../Modal/ModalError";
import { Loader } from "../Loader/Loader";
import { ItemsList } from "./ItemsList";

import { TV } from "../../../types/TV";
import { Movie } from "../../../types/Movie";
import { RiUserSearchLine } from "react-icons/ri";
import { NotFound } from "../NotFound/NotFound";
import { BsCollectionPlay } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../api/fetchData";

type Props = {
  savedType: 'Favourites' | 'WatchList',
};

export const SavedCollection: React.FC<Props> = ({ savedType }) => {
  const session_id: string | null = localStorage.getItem('session_id');
  
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [savedTv, setSavedTv] = useState<TV[]>([]);

  const [moviesTotalPages, setMoviesTotalPages] = useState<number>(10);
  const [tvTotalPages, setTvTotalPages] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';  

  const fetchSavedItems = async () => {
    try {
      setLoading(true);

      if (session_id) {
        let moviesFromServer;
        let tvFromServer;
  
        switch (savedType) {
          case 'Favourites':
            moviesFromServer = await api.get.account.favourites('movies', session_id, page);
            tvFromServer = await api.get.account.favourites('tv', session_id, page);
            break;

            case 'WatchList':
            moviesFromServer = await api.get.account.watchlist('movies', session_id, page);
            tvFromServer = await api.get.account.watchlist('tv', session_id, page);
            break;
        }

        setSavedMovies(
          moviesFromServer.results.map((movie: Movie) => ({
            ...movie,
            type: 'movies',
          }))
        );

        setSavedTv(
          tvFromServer.results.map((tv: TV) => ({
            ...tv,
            type: 'tv',
          }))
        );

        const moviesPages = moviesFromServer.total_pages;
        setMoviesTotalPages(Math.min(moviesPages, 500));

        const tvPages = tvFromServer.total_pages;
        setTvTotalPages(Math.min(tvPages, 500));
      }
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
  
    fetchSavedItems();
  }, [page]);

  if (!session_id) {
    return (
      <NotFound text={`Log in to view your ${savedType} collection`} icon={<RiUserSearchLine />} />
    );
  } 

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

  if (savedMovies.length === 0 && savedTv.length === 0) {
    return (
      <NotFound text={`You haven't added Movies or TV yet`} icon={<BsCollectionPlay />} />
    );
  }

  const title = savedType === 'Favourites'
    ? 'Favourite'
    : 'Watchlist Of'
 
  return (
    <div className="flex flex-col gap-10">
      {savedMovies.length > 0 && (
        <ItemsList
          items={savedMovies}
          totalPages={moviesTotalPages}
          title={`${title} Movies`}
        />
      )}

      {savedTv.length > 0 && (
        <ItemsList
          items={savedTv}
          totalPages={tvTotalPages}
          title={`${title} TV`}
        />
      )}
    </div>
  );
};
