import { MdOutlineMovieFilter } from "react-icons/md";
import { Title } from "../Title/Title";
import { Genre } from "../../../types/Movie";
import { Link } from "react-router-dom";

type Props = {
  type: "Movies" | "TV",
  genres: Genre[],
  images: {
    name: string;
    imgUrl: string;
  }[],
}

export const GenresList: React.FC<Props> = ({ type, genres, images }) => {
  return (
    <div className="flex flex-col gap-5">
      <Title text={`${type} Genre`} icon={<MdOutlineMovieFilter />} />

      <div className="grid grid-flow-row gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-4">
          {genres.map(genre => {
            const genreImage = images.find(image => image.name === genre.name);
            return (
              <Link
                key={genre.id}
                to={`/${type.toLowerCase()}?genre=${genre.id}`}
                className="group relative h-[180px] duration-700"
              >
                <img
                  src={genreImage?.imgUrl}
                  alt="genre"
                  className="w-full h-full object-cover rounded-xl opacity-60 group-hover:opacity-30 duration-700" />
                <span
                  className="absolute bottom-2 left-3 text-2xl lg:text-xl font-bold group-hover:scale-125 group-hover:translate-x-3 group-hover:-translate-y-3 duration-700"
                >
                  {genre.name}
                </span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
