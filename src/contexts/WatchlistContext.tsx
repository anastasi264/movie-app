/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback} from 'react';
import { Movie } from '../types/Movie';
import { TV } from '../types/TV';
import { api } from '../api/fetchData';

export interface WatchlistContextType {
  watchlist: {
    'movies': Movie[],
    'tv': TV[]
  };
  addToWatchlist: (id: number, type: 'movies' | 'tv') => void;
  removeFromWatchlist: (id: number, type: 'movies' | 'tv') => void;
}

export const WatchlistContext = createContext<WatchlistContextType>({
  watchlist: {
    'movies': [],
    'tv': []
  },
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
});

export const WatchlistProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const session_id: string | null = localStorage.getItem('session_id');
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [watchlistTv, setWatchlistTv] = useState<TV[]>([]);

  const fetchWatchlistMovies = useCallback(async () => {
    if (session_id) {
      const moviesFromServer = await api.get.account.watchlist('movies', session_id);
      setWatchlistMovies(moviesFromServer.results);
    }
  }, [session_id]);

  const fetchWatchlistTv = useCallback(async () => {  
    if (session_id) {
      const tvFromServer = await api.get.account.watchlist('tv', session_id);
      setWatchlistTv(tvFromServer.results)
    }
  }, [session_id]);

  useEffect(() => {
    fetchWatchlistMovies();
    fetchWatchlistTv();
  }, [fetchWatchlistMovies, fetchWatchlistTv]);

  const watchlist = useMemo(() => {
    return {
      'movies': watchlistMovies,
      'tv': watchlistTv,
    }
  }, [watchlistMovies, watchlistTv]);

  const addToWatchlist = async (id: number, type: 'movies' | 'tv') => {
    if (session_id) {
      await api.post.account.changeWatchlist(session_id, {
        media_type: type === 'tv' ? type : 'movie', 
        media_id: id, 
        watchlist: true,
      });

      type === 'movies' ? fetchWatchlistMovies() : fetchWatchlistTv();
    }
  };

  const removeFromWatchlist = async (id: number, type: 'movies' | 'tv') => {
    if (session_id) {
      await api.post.account.changeWatchlist(session_id, {
        media_type: type === 'tv' ? type : 'movie', 
        media_id: id, 
        watchlist: false,
      });

      type === 'movies' ? fetchWatchlistMovies() : fetchWatchlistTv();
    }
  };

  const contextWatchlistValue = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  };

  return (
    <WatchlistContext.Provider value={contextWatchlistValue}>
      {children}
    </WatchlistContext.Provider>
  );
};
