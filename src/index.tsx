import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.scss';
import { App } from './App';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { WatchlistProvider } from './contexts/WatchlistContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <FavouritesProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </FavouritesProvider>
  </Router>
);
