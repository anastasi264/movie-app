/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// api
import { api } from "../../api/fetchData";
// types
import { Series } from "../../types/Movie";
// components
import { ItemsList } from "../../components/common/Items/ItemsList";
import { Pagination } from "../../components/common/Pagination/Pagination";


export const TVsPage = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erorr, setErorr] = useState<boolean>(false);

  const [totalPages, setTotalPages] = useState(10);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const fetchMovies = async() => {
    try {
      setLoading(true);
      const seriesFromServer = await api.get.discoverTvs(page); 

      const pages = seriesFromServer.total_pages;
      pages > 500 ? setTotalPages(500) : setTotalPages(pages);

      setSeries(seriesFromServer.results);
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
    <div className="flex flex-col gap-10 w-full ml-12">
      <ItemsList type={'tv'} items={series} />

      <Pagination
        page={+page}
        searchParams={searchParams}
        pageNumbers={totalPages}
      />
    </div>
  );

};
