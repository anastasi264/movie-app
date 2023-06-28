import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { Movie } from "../../../types/Movie";
import { createSlug } from "../../../utils/helpers/stringMethods";
import { api } from "../../../api/fetchData";

import "./Slide.scss";
import { AiFillStar } from "react-icons/ai";

type Props = {
  movie: Movie,
  setModalWindow: Dispatch<SetStateAction<boolean>>,
  setTrailerLink: Dispatch<SetStateAction<string>>,
};

export const Slide: React.FC<Props> = ({ movie, setModalWindow, setTrailerLink}) => {
  const {id, title, poster_path: poster, backdrop_path: bgImage, overview, vote_average, vote_count} = movie;

  const handleClick = async (id: number) => {
    const trailersFromServer = await api.get.media.trailer(id);

    setTrailerLink(trailersFromServer.results[0].key);
    setModalWindow(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {

    const container = containerRef.current;
    const text = textRef.current;

    if (container && text && text.offsetWidth < text.scrollWidth) {
      text.classList.add('scroll');
    } else {
      text?.classList.remove('scroll');
    }
  }, [windowWidth]);
  
  return (
    <div key={id} className="slide">
      <img
        src={`https://image.tmdb.org/t/p/original/${bgImage}`}
        alt="background" 
        className="slide__background"
      />
      <div className="slide__content">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt="movie-poster"
          className="slide__poster"
        />
        <div ref={containerRef} className="slide__details overflow-hidden">
          <div>
            <h4 ref={textRef} className="slide__title whitespace-nowrap">
              {title}
            </h4>
            <span className="slide__year">
              {movie.release_date.slice(0,4)}
            </span>
          </div>
          <p className={classNames(
            "slide__overview",
          )}>
            {overview}
          </p>
          <div>
            {vote_average > 0 && vote_count > 0 && (
              <div className="slide__rating">
                <AiFillStar className="text-yellow-500"/>
                <span>{vote_average.toFixed(1)} / {(vote_count).toLocaleString()}</span>
              </div>
            )}
            <div className="slide__buttons">
              <NavLink
                to={`/movies/${createSlug(title)}`}
                state={{id, type: 'movies'}}
                className="slide__button bg-[#84868766] hover:bg-gray-600"
              >
                Read More
              </NavLink>
              <button
                onClick={() => handleClick(+id)}
                className="slide__button bg-blue-600 bg-opacity-60 hover:bg-blue-900"
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
