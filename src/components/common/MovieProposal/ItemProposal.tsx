import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { Movie } from "../../../types/Movie";
import { createSlug } from "../../../utils/createSlug";
import { api } from "../../../api/fetchData";





type Props = {
  movie: Movie,
  setModalWindow: Dispatch<SetStateAction<boolean>>,
  setTrailerLink: Dispatch<SetStateAction<string>>,
};

export const ItemProposal: React.FC<Props> = ({ movie, setModalWindow, setTrailerLink}) => {
  const {id, title, poster_path: poster, backdrop_path: bgImage, overview, vote_average, vote_count} = movie;


  const handleClick = async (id: number) => {
    try {
      const trailersFromServer = await api.get.trailer(id);

      setTrailerLink(trailersFromServer.results[0].key);
      setModalWindow(true);
    } catch {
      
    }

    // console.log(trailerLink);
  };
  
  return (
    <div className="">
      <div key={id} className=" h-full w-full bg-transparent bg-black bg-opacity-70">
        <img
          src={`https://image.tmdb.org/t/p/original/${bgImage}`}
          alt="background" 
          className="absolute h-full w-full object-cover top-0 z-0 rounded-2xl opacity-20"
        />
        <div className="flex gap-6 py-10 px-12">
          <div className="w-[230px] shrink-0 z-10">
            <img
              src={`https://image.tmdb.org/t/p/original/${poster}`}
              alt="movie-poster"
              className="w-full h-[340px] object-cover object-top rounded-3xl duration-700"
            />
          </div>
          <div className="grow flex flex-col justify-between z-10">
            <div className="">
              <h4 className="text-[34px] font-bold mb-2">
                {title}
              </h4>
              <span className="text-[20px] font-bold">
                {movie.release_date.slice(0,4)}
              </span>
            </div>
            <div className="">
              <p className={classNames(
                "mb-2 text-justify w-full line-clamp-3 hoverflow-hidden duration-700",
                {"line-clamp-2": title.length > 32}
              )}>
                {overview}
              </p>
            </div>
            <div className="">
              {vote_average > 0 && vote_count > 0 && (
                <div className="mb-4 flex gap-2 items-center">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span>{vote_average.toFixed(1)} / {(vote_count).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <NavLink
                  to={`/movies/${createSlug(title)}`}
                  state={{id, type: 'movies'}}
                  className="rounded-xl w-[45%] py-3 text-center bg-[#84868766] hover:bg-gray-600 duration-700"
                >
                  Read More
                </NavLink>
                <button
                  onClick={() => handleClick(+id)}
                  className="rounded-xl w-[45%] py-3 bg-[#3f34da92] hover:bg-blue-900 duration-700"
                >
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
