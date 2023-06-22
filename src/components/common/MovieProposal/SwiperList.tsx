import { HiFire } from "react-icons/hi";
import { Movie } from "../../../types/Movie";
import { Slide } from "./Slide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import { useState } from "react";
import { ModalTrailer } from "../Modal/ModalTrailer";
import { Title } from "../Title/Title";
import { TV } from "../../../types/TV";

type Props = {
  title: string,
  movies: Movie[] | TV[],
};

export const SwiperList: React.FC<Props> = ({ title, movies }) => {
  const [modalIsOpen, setModalWindow] = useState(false);
  const [trailerLink, setTrailerLink] = useState<string>('');

  return (
    <div className="flex flex-col gap-5">
      <Title text={title} icon={<HiFire />} />
      <Swiper 
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
        className="max-w-full duration-700 rounded-3xl"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
      >
        {movies.map((movie: any) => (
          <SwiperSlide key={movie.id}>
            <Slide movie={movie} setModalWindow={setModalWindow} setTrailerLink={setTrailerLink}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {modalIsOpen && (
        <ModalTrailer link={trailerLink} showModal={setModalWindow} />
      )}
    </div>
  );
};
