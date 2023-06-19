import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { TVPage } from './pages/TVPage/TVPage';
import { GenresPage } from './pages/GenresPage/GenresPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ItemPage } from './pages/ItemPage/ItemPage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { WatchListPage } from './pages/WatchListPage/WatchListPage';
import { AuthenticationPage } from './pages/AuthenticationPage/AuthenticationPage';
import { LoginPageStep1 } from './pages/AuthenticationPage/LoginPageStep1';
import { LoginPageStep2 } from './pages/AuthenticationPage/LoginPageStep2';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to={"/explore"}/>} />
        <Route path="/explore">
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/search">
          <Route index element={<SearchPage />} />
        </Route>
        <Route path="/movies">
          <Route index element={<MoviesPage />} />
          <Route path=":movie" element={<ItemPage />} />
        </Route>
        <Route path="/tv">
          <Route index element={<TVPage />} />
          <Route path=":series" element={<ItemPage />} />
        </Route>
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/authentication">
          <Route index element={<AuthenticationPage />} />
          <Route path=":step-1" element={<LoginPageStep1 />} />
          <Route path=":step-2" element={<LoginPageStep2 />} />
        </Route>
      </Route>
    </Routes>
  );
}
