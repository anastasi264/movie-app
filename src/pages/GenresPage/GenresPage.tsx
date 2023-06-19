import { useState, useEffect } from "react"; 
import { api } from "../../api/fetchData";
import { Genre } from "../../types/Genre";
import { movieImages, tvImages } from "./GenresImages";
import { GenresList } from "../../components/common/GenresList/GenresList";
import { Loader } from "../../components/common/Loader/Loader";
import { ModalError } from "../../components/common/Modal/ModalError";


export const GenresPage = () => {
  const [movieGenres, setMovieGenres] = useState<Genre[]>();
  const [tvGenres, setTvGenres] = useState<Genre[]>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchGenres = async () => {
    try {
      setLoading(true);

      const movieGenresFromServer = await api.get.media.genres("movie");
      const tvGenresFromServer = await api.get.media.genres("tv");

      setMovieGenres(movieGenresFromServer.genres);
      setTvGenres(tvGenresFromServer.genres);
    } catch {
        setError(true);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  if (error) {
    return (
      <ModalError text="Sorry, your requested resource is not found."/>
    );
  }

  if (loading || (!movieGenres && !tvGenres) ) {
    return (
      <Loader />
    );
  }

  return (
    <div className="flex flex-col gap-10 max-w-full">
      {movieGenres && (
        <GenresList type="Movies" genres={movieGenres} images={movieImages} /> 
      )}

      {tvGenres && (
        <GenresList type="TV" genres={tvGenres} images={tvImages} /> 
      )}
    </div>
  );
};
