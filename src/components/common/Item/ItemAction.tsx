import { useContext, useMemo } from "react";

import { BsFillBookmarkHeartFill } from "react-icons/bs"
import { MdPlaylistAddCircle } from "react-icons/md"
import classNames from "classnames";
import { FavouritesContext } from "../../../contexts/FavouritesContext";
import { WatchlistContext } from "../../../contexts/WatchlistContext";


type Props = {
  type: 'movies' | 'tv',
  id: number,
};

export const ItemAction: React.FC<Props> = ({ type, id }) => {
  const session_id = localStorage.getItem('session_id');

  const renderCorrectText = (isAdded: boolean, type: 'favourites' | 'watchlist') => {
    if (!session_id) {
      return `Log in to save`;
    }
    
    return isAdded ? `Delete from ${type}` : `Add to ${type}`;
  };

  const { favourites, addToFavourites, removeFromFavourites } = useContext(
    FavouritesContext
  );
  const { watchlist, addToWatchlist, removeFromWatchlist } = useContext(
    WatchlistContext
  );

  const isFavourite = useMemo(() => {
    return favourites[type].some(item => item.id === id)
  }, [favourites, id, type])

  const isInWatchlist = useMemo(() => {
    return watchlist[type].some(item => item.id === id)
  }, [watchlist, id, type])
  
  const changeFavourites = (event: React.MouseEvent) => {
    event?.preventDefault();
    isFavourite ? removeFromFavourites(id, type) : addToFavourites(id, type);
  };

  const changeWatchlist = (event: React.MouseEvent) => {
    event?.preventDefault();
    isInWatchlist ? removeFromWatchlist(id, type) : addToWatchlist(id, type);
  };

  return (
    <div className="flex flex-col absolute opacity-100 top-0 left-2 group-hover:opacity-100">
      <button
        type="button"
        className="flex gap-2 items-center opacity-0 group-hover:opacity-100 duration-700"
        onClick={(event) => changeFavourites(event)}
      >
        <BsFillBookmarkHeartFill className={classNames(
          "peer text-[40px]",
          {"text-yellow-600 hover:text-yellow-500" : !isFavourite},
          {"text-blue-600 hover:text-blue-500" : isFavourite}
        )}/>
        <span className="opacity-0 translate-x-[-10px] text-gray-300 text-[16px] peer-hover:opacity-100 peer-hover:translate-x-0 duration-500">
          {renderCorrectText(isFavourite, 'favourites')}
        </span>
      </button>

      <button
        type="button"
        className="flex gap-2 items-center opacity-0 group-hover:opacity-100 duration-700"
        onClick={(event) => changeWatchlist(event)}
      >
        <MdPlaylistAddCircle className={classNames(
          "peer text-[40px]",
          {"text-yellow-600 hover:text-yellow-500" : !isInWatchlist},
          {"text-blue-600 hover:text-blue-500" : isInWatchlist}
        )}/>
        <span className="opacity-0 translate-x-[-10px] text-gray-300 text-[16px] peer-hover:opacity-100 peer-hover:translate-x-0 duration-500 ">
        {renderCorrectText(isInWatchlist, 'watchlist')}
        </span>
      </button>
    </div>
  );
};
 