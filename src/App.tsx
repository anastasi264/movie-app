import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainLayout } from './components/layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { MoviesPage } from './pages/MoviesPage/MoviesPage';
import { TVsPage } from './pages/TVsPage/TVsPage';
import { CartoonsPage } from './pages/CartoonsPage/CartoonsPage';
import { GenresPage } from './pages/GenresPage/GenresPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ItemPage } from './pages/ItemPage/ItemPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/explore">
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/movies">
          <Route index element={<MoviesPage />} />
          <Route path=":movie" element={<ItemPage />} />
        </Route>
        <Route path="/tv">
          <Route index element={<TVsPage />} />
          <Route path=":series" element={<ItemPage />} />
        </Route>
        <Route path="/cartoons" element={<CartoonsPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Route>
    </Routes>
  );
}
