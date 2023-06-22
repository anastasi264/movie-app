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
import { getYearFromFullDate } from '../../utils/helpers/filterItems';

export const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVs, setTrendingTVs] = useState<TV[]>([]);
  const [upcomingMovies, setUpComingMovies] = useState<Movie[]>([]);
  const [sidebarMovies, setSidebarMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [isOpenList, setShowList] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const trendingMoviesFromServer = await api.get.media.popularMovies();
      setTrendingMovies(trendingMoviesFromServer.results);

      const trendingTvFromServer = await api.get.media.tvSeriesAircoming();
      setTrendingTVs(trendingTvFromServer.results);
  
      const upcomingMoviesFromServer = await api.get.media.upcoming();
      const upcoming = upcomingMoviesFromServer.results.filter((movie: Movie) => (
        movie.poster_path && movie.title && movie.overview && movie.backdrop_path && movie.release_date
        ));
        
      setUpComingMovies(upcoming);
        
      const sidebarMoviesFromServer = await api.get.media.nowPlaying();
      setSidebarMovies(sidebarMoviesFromServer.results.map((item: Movie) => ({...item, poster_path: ''})));
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

  if (loading || (!trendingMovies && !trendingTVs && !upcomingMovies && !sidebarMovies) ) {
    return (
      <Loader />
    );
  }

  return (
    <div className="grid grid-cols-7 gap-10 lg:grid-cols-1">
      <div className="flex flex-col gap-10 col-span-5 lg:col-span-1">
        <div className="max-w-full">
          <SwiperList title="Trending Movies" movies={trendingMovies.slice(0, 10)}/>
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
          <div className="grid grid-flow-row gap-5 grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {isOpenList
              ? trendingTVs.map(series => (
                  <div key={series.id}>
                    <ItemCard type='tv' item={series} />
                  </div>
                ))
              : trendingTVs.slice(0, 12).map(series => (
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

      <div className="now-playing col-span-2 lg:col-span-1 flex flex-col gap-5 min-w-full">
        <Title text="Now Playing" icon={<GiPopcorn />}/>
        <div className={`
          flex flex-col gap-6
          lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1
        `}>
          {sidebarMovies.slice(0, 6).reverse().map(movie=> (
            <div
              key={movie.id}
              className="flex flex-col gap-3"
            >
              <ItemCard type='movies' item={movie} showDetails={false} />
              <div className="">
                <h5 className="font-bold text-xl mb-1 lg:overflow-hidden truncate lg:text-base">
                  {movie.title} | {getYearFromFullDate(movie.release_date)}
                </h5>
                <span className="text-justify text-gray-400 line-clamp-4 xl:line-clamp-3">
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
