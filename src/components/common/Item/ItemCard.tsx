import { Link } from "react-router-dom";

import { BsPlayCircle } from "react-icons/bs";
import { createSlug } from "../../../utils/helpers/stringMethods";
import { getImage, getVote } from "../../../utils/helpers/filterItems";
import { ItemAction } from "./ItemAction";
import { AiFillStar } from "react-icons/ai";


type Props = {
  type: 'movies' | 'tv',
  item: any,
  showDetails?: boolean,
};

export const ItemCard: React.FC<Props> = ({ type, item, showDetails = true }) => {
  const { title, name, id, poster_path, backdrop_path, vote_average } = item; 

  return (
    <Link
      to={`/${type}/${createSlug(title || name)}`}
      state={{id, type}}
      className="max-w-full duration-1000"
    >
      <div className="relative group">
        <img
          className="rounded-2xl mx-[auto] shadow h-full object-cover duration-500 group-hover:opacity-30"
          src={getImage(poster_path || backdrop_path)}
          alt="movie-img" 
        />
        <BsPlayCircle className="absolute opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[80px] lg:text-[60px] duration-1000 group-hover:opacity-100"/>
        <ItemAction type={type} id={id} />
      </div>
      {showDetails && (
        <div className="p-2 ">
          <h5 className="text-center font-bold mb-1 line-clamp-1">
            {title || name}
          </h5>
          <div className="flex items-center justify-center gap-1 text-yellow-500">
            <AiFillStar className="text-yellow-500"/>
            <span>{getVote(vote_average)}</span>
          </div>
        </div>
      )}
    </Link>
  );
};
