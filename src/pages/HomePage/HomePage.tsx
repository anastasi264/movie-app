// react
import { useEffect, useState } from 'react';
import { GiPopcorn } from 'react-icons/gi'
import { Link } from 'react-scroll'

import { api } from '../../api/fetchData';
import { Movie } from '../../types/Movie';
import { TV } from '../../types/TV';
import { SwiperList } from '../../components/common/MovieProposal/SwiperList';
import { ItemCard } from '../../components/common/Item/ItemCard';
import { RiMovie2Line } from 'react-icons/ri';
import classNames from 'classnames';

// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import { Title } from '../../components/common/Title/Title';
import { ModalError } from '../../components/common/Modal/ModalError';
import { Loader } from '../../components/common/Loader/Loader';

export const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [aircomingTVs, setAircomingTVs] = useState<TV[] | null>(null);
  const [upcomingMovies, setUpComingMovies] = useState<any[] | null>(null);
  const [sidebarMovies, setSidebarMovies] = useState<Movie[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [isOpenList, setShowList] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const moviesFromServer = await api.get.media.popularMovies();
      const tvsFromServer = await api.get.media.tvSeriesAircoming();
  
      const upcomingMoviesFromServer = await api.get.media.upcoming();
      const upcoming = upcomingMoviesFromServer.results.filter((movie: Movie) => (
        movie.poster_path && movie.title && movie.overview && movie.backdrop_path && movie.release_date
      ));
  
      const sidebarMoviesFromServer = await api.get.media.nowPlaying();
  
      setSidebarMovies(sidebarMoviesFromServer.results);
      setTrendingMovies(moviesFromServer.results);
      setAircomingTVs(tvsFromServer.results);
      setUpComingMovies(upcoming);
    } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  if (error) {
    return (
      <ModalError text="Sorry, your requested resource is not found."/>
    );
  }

  if (loading || (!trendingMovies && !aircomingTVs && !upcomingMovies && !sidebarMovies) ) {
    return (
      <Loader />
    );
  }

  return (
    <div className="grid grid-cols-4 gap-10 w-full">
      <div className="flex flex-col gap-10 col-span-3">
        <div className="max-w-full">
          <SwiperList title="Trending Movies" movies={trendingMovies?.slice(0, 10)}/>
        </div>

        <div id="series" className="flex flex-col">
          <Title text="Top Rated Series" icon={<RiMovie2Line />} />
          <div className="text-blue-500 underline text-right duration-500 mb-2">
            <Link
              className="cursor-pointer"
              activeClass="active"
              to="series"
              spy={true}
              smooth={true}
              offset={isOpenList ? 0 : 500}
              duration={700}
              onClick={() => {setShowList(!isOpenList)}}
            >
              {isOpenList ? 'Hide' : 'View All'}
            </Link>
          </div>
          <div className={classNames(
            "grid grid-flow-row gap-3 grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 rounded-2xl",
            {"h-[845px] overflow-hidden duration-700": !isOpenList},
          )}
          >
            {aircomingTVs?.map(series => (
              <div key={series.id}>
                <ItemCard type='tv' item={series} />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-full">
          <SwiperList title="Upcoming Movies" movies={upcomingMovies}/>
        </div>
      </div>

      <div className="col-span-1 shrink-0 flex flex-col gap-5">
        <Title text="Now Playing" icon={<GiPopcorn />}/>
        <div className="">
          {sidebarMovies?.slice(10, 14).map(movie=> (
            <div
              key={movie.id}
              className="flex flex-col mb-10">
              <div className="max-h-[340px] overflow-hidden mb-3 rounded-2xl">
                <ItemCard type='movies' item={movie} />
              </div>
              <div className="">
                <h5 className="font-bold">
                  {movie.title} | {movie.release_date.slice(0,4)}
                </h5>
                <span className="text-[16px] text-justify text-gray-400 line-clamp-3">
                  {movie.overview}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
