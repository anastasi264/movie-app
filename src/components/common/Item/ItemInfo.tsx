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
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="group relative">
          <img 
            src={getImage(poster)}
            alt="poster"
            className="rounded-2xl shadow max-w-full h-full max-h-[600px] object-cover group-hover:opacity-50 duration-700"
          />
          <ItemAction type={type} id={id} />
        </div>

        <div className="grow w-full flex flex-col justify-center gap-10">
          <div className="top">
            <h2 className="text-[34px] font-bold">
              {title}
            </h2>
            <p>{tagline}</p>
          </div>
          {genres.length > 0 && (
            <div className="list">
              <ul className="flex gap-3">
                {genres.map(genre => (
                  <li key={genre.id} className="px-4 py-2 rounded-lg bg-blue-900">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="info justify-self-end">
            <div className="grid gap-3">
              {year && (
                <div className="grid grid-cols-6">
                  <span className="text-gray-400">Year:</span>
                  <span className="col-span-5">{year}</span>
                </div>
              )}
              {(time && time !== 0) && (
                <div className="grid grid-cols-6">
                  <span className="text-gray-400">Time:</span>
                  <span className="col-span-5">{time} minutes</span>
                </div>
              )}
              {countries.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="text-gray-400">Country:</span>
                  <span className="col-span-5">
                    {countries.map((country, index) => {
                      if (index === countries.length - 1) {
                        return (
                          <span>{country.name}</span>
                        );
                      }

                      return (
                        <span>{`${country.name}, `}</span>
                      );
                    })}
                  </span>
                </div>
              )}
              {cast.length > 0 && (
                <div className="grid grid-cols-6">
                  <span className="text-gray-400">Actors:</span>
                  <span className="col-span-5">
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
                <div className="grid grid-cols-6">
                  <span className="flex justify-center items-center p-1 max-w-[60%] text-gray-900 font-bold rounded-md bg-yellow-600">IMBd</span>
                  <span className="col-span-5 flex items-center gap-1">
                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <span>{rating.toFixed(1)} / {(votes).toLocaleString()}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {overview && (
          <div className="description flex flex-col gap-5 text-justify">
            <h3 className="text-[34px] pl-3 border-l-[3px] border-yellow-500">Description</h3>
            <p>
              {overview}
            </p>
          </div>
        )}

        {images.length > 4 && (
          <div className="grid grid-flow-row gap-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mx-auto">
            {images.slice(6, 10).map(image => (
              <img
                key={image.file_path}
                src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                alt="movie-img"
                className="h-[200px] w-full object-cover object-top shadow"/>
            ))}
          </div>
        )}

        {trailer && (
          <div className="">
            <iframe
            
              className="w-full aspect-video rounded-2xl" 
              src={`https://www.youtube.com/embed/${trailer.key}`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; enclasscrypted-media; gyroscope; picture-in-picture; web-share" 
            />
          </div>
        )}

        {similars && similars.length > 0 && (
          <div className="similar max-w-[1240px]">
            <h3 className="text-[34px] pl-3 mb-5 border-l-[3px] border-yellow-500">
              {`Similar ${type} like ${title}`}
            </h3>
            <Swiper
              slidesPerView={6}
              slidesPerGroup={3}
              spaceBetween={10}
              modules={[Navigation, Pagination]}
              className="max-w-full duration-700 rounded-3xl"
              navigation
              loop={true}
              speed={1200}
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
