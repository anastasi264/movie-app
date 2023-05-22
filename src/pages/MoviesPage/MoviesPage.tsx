/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// api
import { api } from "../../api/fetchData";
// types
import { Movie } from "../../types/Movie";
// components
import { ItemsList } from "../../components/common/Items/ItemsList";
import { Pagination } from "../../components/common/Pagination/Pagination";



export const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erorr, setErorr] = useState<boolean>(false);

  const [totalPages, setTotalPages] = useState(10);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;



  const fetchMovies = async() => {
    try {
      setLoading(true);
      const moviesFromServer = await api.get.discoverMovies(page); 

      const pages = moviesFromServer.total_pages;
      pages > 500 ? setTotalPages(500) : setTotalPages(pages);

      setMovies(moviesFromServer.results);
    } catch {
      setErorr(true);
    } finally {
      setErorr(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  
    fetchMovies();
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-5 ml-12">
      <ItemsList type={'movies'} items={movies} />

      <Pagination
        page={+page}
        searchParams={searchParams}
        pageNumbers={totalPages}
      />
    </div>
  );
};
