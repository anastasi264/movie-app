import { CastMember, Genre, Image, ProductionCountry, Similars, Video } from "../../../types/Movie";
import { ItemCard } from "./ItemCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import { getImage } from "../../../utils/helpers/filterItems";
import { ItemAction } from "./ItemAction";
import { AiFillStar } from "react-icons/ai";

import "./ItemInfo.scss"

type Props = {
  type: 'movies' | 'tv',
  id: number,
  poster: string | null,
  title: string,
  tagline: string,
  genres: Genre[];
  year: string,
  time: number | null,
  countries: ProductionCountry[],
  actors: CastMember[],
  rating: number,
  votes: number,
  overview: string,
  images: Image[],
  trailer: Video,
  similars: Similars[],
}

export const ItemInfo: React.FC<Props> = ({
  type,
  id,
  poster,
  title,
  tagline,
  genres,
  year,
  time,
  countries,
  actors,
  rating,
  votes,
  overview,
  images,
  trailer,
  similars,
}) => {
  const cast = actors.slice(0, 10);
  const similarsMovie = similars.filter(item => item.backdrop_path !== null);

  return (
    <div className="movie-container">
      <div className="movie-container__content content">
        <div>
          <img
            src={getImage(poster)}
            alt="poster"
            className="content__image"
          />
          <ItemAction type={type} id={id} />
        </div>

        <div className="content__details">
          <div className="content__header">
            <h2 className="content__title">
              {title}
            </h2>
            <p className="content__tagline">
              {tagline}
            </p>
          </div>
          {genres.length > 0 && (
            <ul className="content__genres-list">
              {genres.map(genre => (
                <li
                  key={genre.id}
                  className="content__genre-item"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
          <div className="content__info-block">
            {year && (
              <div className="content__info-item">
                <span className="content__info-item_label">
                  Year:
                </span>
                <span className="content__info-item_value">
                  {year}
                </span>
              </div>
            )}
            {(time && time !== 0) && (
              <div className="content__info-item">
                <span className="content__info-item_label">
                  Time:
                </span>
                <span className="content__info-item_value">
                  {time} minutes
                </span>
              </div>
            )}
            {countries.length > 0 && (
              <div className="content__info-item">
                <span className="content__info-item_label">
                  Country:
                </span>
                <span className="content__info-item_value">
                  {countries.map((country, index) => {
                    if (index === countries.length - 1) {
                      return (
                        <span key={country.name}>{country.name}</span>
                      );
                    }

                    return (
                      <span key={country.name}>{`${country.name}, `}</span>
                    );
                  })}
                </span>
              </div>
            )}
            {cast.length > 0 && (
              <div className="content__info-item">
                <span className="content__info-item_label">Actors:</span>
                <span className="content__info-item_value">
                  {cast.map((actor, index) => {
                    if (index === cast.length - 1) {
                      return (
                        <span key={actor.id}>{actor.name}</span>
                      );
                    }

                    return (
                      <span key={actor.id}>{`${actor.name}, `}</span>
                    );
                  })}
                </span>
              </div>
            )}
            {rating > 0 && votes > 0 && (
              <div className="content__info-item">
                <span className={`
                  flex justify-center items-center p-1 max-w-[60%]
                  text-gray-900 font-bold rounded-md bg-yellow-600
                `}>
                  IMBd
                </span>
                <span className="content__info-item_value flex items-center gap-1">
                  <AiFillStar className="text-yellow-500"/>
                  <span>{rating.toFixed(1)} / {(votes).toLocaleString()}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="movie-container__media media">
        {overview && (
          <div className="media__description-block">
            <h3 className="media__title">
              Description
            </h3>
            <p>
              {overview}
            </p>
          </div>
        )}

        {images.length >= 4 && (
          <div className="media__gallery">
            {images.slice(0, 4).map(image => (
              <img
                key={image.file_path}
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                alt="movie-img"
                className="media__image" />
            ))}
          </div>
        )}

        {trailer && (
          <div>
            <iframe
              className="w-full aspect-video rounded-2xl" 
              src={`https://www.youtube.com/embed/${trailer.key}`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; enclasscrypted-media; gyroscope; picture-in-picture; web-share" 
            />
          </div>
        )}

        {similars && similars.length > 0 && (
          <div className="media__similar">
            <h3 className="media__title">
              {`Similar ${type} like ${title}`}
            </h3>
            <Swiper
              slidesPerView={2}
              slidesPerGroup={2}
              spaceBetween={10}
              modules={[Navigation, Pagination]}
              className="max-w-full duration-700 rounded-3xl"
              navigation
              loop={true}
              speed={1200}
              breakpoints={{
                425: {
                  slidesPerView: 3
                },
                640: {
                  slidesPerView: 4
                },
                1024: {
                  slidesPerView: 5,
                  slidesPerGroup: 3
                },
                1280: {
                  slidesPerView: 6
                }
              }}
            >
              {similarsMovie.map(movie => (
                <SwiperSlide key={movie.id}>
                  <ItemCard item={movie} type={type} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};
