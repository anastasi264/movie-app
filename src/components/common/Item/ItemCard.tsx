import { Link } from "react-router-dom";

import { BsPlayCircle } from "react-icons/bs";
import { createSlug } from "../../../utils/createSlug";

type Props = {
  type?: string,
  item: any,
};

export const ItemCard: React.FC<Props> = ({ type, item }) => {
  const { title, name, id, poster_path, vote_average}= item;

  return (
    <div
      key={id}
      className="max-w-[230px] duration-1000"
    >
      <Link
        to={`/${type}/${createSlug(title || name)}`}
        state={{id, type}}
      >
        <div className="relative group">
          <img
            className="rounded-2xl mx-[auto] shadow min-w-full h-[340px] object-cover hover:scale-105 duration-500 group-hover:opacity-50"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt="movie-img" 
          />
          <BsPlayCircle className="absolute opacity-0 top-[calc(50%-40px)] left-[calc(50%-40px)] text-white text-[80px] duration-1000 group-hover:opacity-100"/>
        </div>
      </Link>
      <div className="p-2">
        <Link to="#">
          <h5 className="text-center font-bold mb-1 line-clamp-1">
            {title || name}
          </h5>
        </Link>
        <div className="flex items-center justify-center gap-1 text-yellow-500">
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span>{+vote_average.toFixed(1) || ''}</span>
        </div>
      </div>
    </div>
  );
};
