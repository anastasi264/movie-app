import { Link } from "react-router-dom";

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
      <div className="relative group overflow-hidden">
        <img
          className="rounded-2xl mx-[auto] shadow h-full object-cover duration-500 group-hover:opacity-30"
          src={getImage(poster_path || backdrop_path)}
          alt="movie-img" 
        />
        <svg fill="currentColor" className="max-w-[100px] absolute opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 duration-1000" viewBox="0 0 16 16"> 
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> 
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/> 
        </svg>
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
