/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback} from 'react';
import { Movie } from '../types/Movie';
import { TV } from '../types/TV';
import { api } from '../api/fetchData';

export interface FavouritesContextType {
  favourites: {
    'movies': Movie[],
    'tv': TV[]
  };
  addToFavourites: (id: number, type: 'movies' | 'tv') => void;
  removeFromFavourites: (id: number, type: 'movies' | 'tv') => void;
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: {
    'movies': [],
    'tv': []
  },
  addToFavourites: () => {},
  removeFromFavourites: () => {},
});

export const FavouritesProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const session_id: string | null = localStorage.getItem('session_id');
  const [favouritesMovies, setFavouritesMovies] = useState<Movie[]>([]);
  const [favouritesTv, setFavouritesTv] = useState<TV[]>([]);

  const fetchFavouriteMovies = useCallback(async () => {
    if (session_id) {
      const moviesFromServer = await api.get.account.favourites('movies', session_id);
      setFavouritesMovies(moviesFromServer.results);
    }
  }, []);

  const fetchFavouriteTv = useCallback(async () => {  
    if (session_id) {
      const tvFromServer = await api.get.account.favourites('tv', session_id);
      setFavouritesTv(tvFromServer.results)
    }
  }, []);

  useEffect(() => {
    fetchFavouriteMovies();
    fetchFavouriteTv();
  }, []);

  const favourites = useMemo(() => {
    return {
      'movies': favouritesMovies,
      'tv': favouritesTv,
    }
  }, [favouritesMovies, favouritesTv]);

  const addToFavourites = async (id: number, type: 'movies' | 'tv') => {
    if (session_id) {
      await api.post.account.changeFavourites(session_id, {
        media_type: type === 'tv' ? type : 'movie', 
        media_id: id, 
        favorite: true,
      });

      type === 'movies' ? fetchFavouriteMovies() : fetchFavouriteTv();
    }
  };

  const removeFromFavourites = async (id: number, type: 'movies' | 'tv') => {
    if (session_id) {
      await api.post.account.changeFavourites(session_id, {
        media_type: type === 'tv' ? type : 'movie', 
        media_id: id, 
        favorite: false,
      });

      type === 'movies' ? fetchFavouriteMovies() : fetchFavouriteTv();
    }
  };

  const contextFavouritesValue = {
    favourites,
    addToFavourites,
    removeFromFavourites,
  };

  return (
    <FavouritesContext.Provider value={contextFavouritesValue}>
      {children}
    </FavouritesContext.Provider>
  );
};



