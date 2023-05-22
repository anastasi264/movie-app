import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { CastMember, Genre, Image, ProductionCountry, Similars, Video } from "../../../types/Movie";
import { Slider } from "../Slider/Slider";


type Props = {
  type: string,
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
  description: string,
  images: Image[],
  trailer: Video,
  similars: Similars[],
}

export const ItemInfo: React.FC<Props> = ({
  type,
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
  description,
  images,
  trailer,
  similars,
}) => {
  return (
    <div className="ml-12 my-10">
      <div className="flex gap-10 mb-10">
        <div className="max-w-[600px] shrink-0">
          <div className="group relative">
            <img 
              src={`https://image.tmdb.org/t/p/original/${poster}`}
              alt="poster"
              className="rounded-2xl shadow w-[360px] h-[500px] object-cover"
            />
            <button
              type="button"
              className="absolute top-[-10px] left-[-10px] text-[50px] text-yellow-600 group-hover:text-[80px] hover:text-red-700 duration-700"
            >
              <BsFillBookmarkHeartFill />
            </button>
          </div>
        </div>

        <div className="grow w-full flex flex-col justify-between py-4">
          <div className="top">
            <h2 className="text-[34px] font-bold">
              {title}
            </h2>
            <p>{tagline}</p>
          </div>
          <div className="list">
            <ul className="flex gap-3">
              {genres.map(genre => (
                <li key={genre.id} className="px-4 py-2 rounded-lg hover:bg-gray-700 bg-blue-900 hover:text-white duration-300">
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="info justify-self-end">
            <div className="grid gap-3">
              <div className="grid grid-cols-6">
                <span className="text-gray-400">Year:</span>
                <span className="col-span-5">{year}</span>
              </div>
              <div className="grid grid-cols-6">
                <span className="text-gray-400">Time:</span>
                <span className="col-span-5">{time} minutes</span>
              </div>
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
              <div className="grid grid-cols-6">
                <span className="text-gray-400">Actors:</span>
                <span className="col-span-5">
                  {actors.slice(0, 10).map((actor, index) => {
                    if (index === 9) {
                      return (
                        <span>{actor.name}</span>
                      );
                    }

                    return (
                      <span>{`${actor.name}, `}</span>
                    );
                  })}
                </span>
              </div>
              <div className="grid grid-cols-6">
                <span className="flex justify-center items-center p-1 max-w-[60%] text-gray-900 font-bold rounded-md bg-yellow-600">IMBd</span>
                <span className="col-span-5 flex items-center gap-1">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <span>{rating.toFixed(1)} / {(votes).toLocaleString()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {description && (
          <div className="description flex flex-col gap-5 text-justify">
            <h3 className="text-[34px] pl-3 border-l-[3px] border-yellow-500">Description</h3>
            <p>
              {description}
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
          <div className="similar w-[1240px]">
            <h3 className="text-[34px] pl-3 mb-5 border-l-[3px] border-yellow-500">
              {`Similar Movies like ${title}`}
            </h3>

            <Slider type={type} items={similars} />
          </div>
        )}
      </div>
    </div>
  );
};
