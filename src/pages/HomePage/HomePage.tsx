import { useEffect, useState } from 'react';
import { HiFire } from 'react-icons/hi'
import { api } from '../../api/fetchData';
import { Movie, Series } from '../../types/Movie';
import { SwiperList } from '../../components/common/MovieProposal/SwiperList';
import { ItemsList } from '../../components/common/Items/ItemsList';
import { ItemCard } from '../../components/common/Item/ItemCard';
import { RiMovie2Line } from 'react-icons/ri';
import classNames from 'classnames';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export const HomePage = () => {

  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [aircomingTVs, setAircomingTVs] = useState<Series[] | null>(null);
  const [upcomingMovies, setUpComingMovies] = useState<any[] | null>(null);
  const [sidebarMovies, setSidebarMovies] = useState<Movie[] | null>(null);

  const [isOpenList, setShowList] = useState<boolean>(false);

  const fetchMovies = async () => {
    const moviesFromServer = await api.get.popularMovies();
    const tvsFromServer = await api.get.tvSeriesAircoming();

    const upcomingMoviesFromServer = await api.get.upcoming();
    const upcoming = upcomingMoviesFromServer.results.filter((movie: Movie) => (
      movie.poster_path && movie.title && movie.overview && movie.backdrop_path && movie.release_date
    ));

    const sidebarMoviesFromServer = await api.get.peopleLike();

    setSidebarMovies(sidebarMoviesFromServer.results);
    setTrendingMovies(moviesFromServer.results);
    setAircomingTVs(tvsFromServer.results);
    setUpComingMovies(upcoming)
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  console.log(trendingMovies);

  
  return (
    <div className="flex">
      <div className="flex flex-col gap-10 mx-12 mb-10">
        <div className="grow">
          {trendingMovies && (
            <SwiperList title="Trending Movies" movies={trendingMovies.slice(0, 10)}/>
          )}
        </div>

        {aircomingTVs && (
          <div id="series" className="flex flex-col gap-2">
            <div className="flex gap-2 items-center text-[34px] font-bold">
              <h3>Top Rated Series</h3>
              <span><RiMovie2Line /></span>
            </div>
            <div className="text-blue-500 underline text-right duration-500">
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
              "grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto",
              {"h-[855px] overflow-hidden duration-700": !isOpenList},
            )}
            >
              {aircomingTVs.map(series => (
                <ItemCard type='tv' item={series} />
              ))}
            </div>
          </div>
        )}

        <div className="grow">
          {upcomingMovies && (
            <SwiperList title="Upcoming Movies" movies={upcomingMovies}/>
          )}
        </div>
      </div>

      <div className="min-w-[300px] h-[80vh] shrink-0 flex flex-col gap-7">
        <div className="flex gap-2 items-center text-[34px] font-bold">
          <h3>Popular Actors</h3>
          <span><RiMovie2Line /></span>
        </div>
        <div className="">
          {sidebarMovies && (
            sidebarMovies.map((actor: any) => (
              <div className="flex flex-col mb-10">
                <div className="flex gap-3">
                  <img
                    className="rounded-2xl shadow max-w-[200px] h-[310px] object-cover hover:scale-105 duration-500 group-hover:opacity-50"
                    src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} 
                    alt="actor" 
                  />
                  <div className="">
                    <h5>{actor.name}</h5>
                    <span>
                      {actor.departing}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};
