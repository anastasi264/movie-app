import { HiFire } from "react-icons/hi";
import { Movie } from "../../../types/Movie";
import { ItemProposal } from "./ItemProposal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay';
import { useState } from "react";
import { ModalWindowTrailer } from "../ModalWindow";
import classNames from "classnames";

type Props = {
  title: string,
  movies: Movie[] | any,
};

export const SwiperList: React.FC<Props> = ({ title, movies }) => {
  const [modalIsOpen, setModalWindow] = useState(false);
  const [trailerLink, setTrailerLink] = useState<any>(null);

  return (
    <div className={classNames(
      "flex flex-col gap-5 w-full"
    )}>
      <div className="flex gap-2 items-center text-[34px] font-bold">
        <h3>{title}</h3>
        <span><HiFire /></span>
      </div>
      <Swiper 
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
        className="max-w-[900px] duration-700 rounded-3xl"
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
          <SwiperSlide>
            <ItemProposal movie={movie} setModalWindow={setModalWindow} setTrailerLink={setTrailerLink}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {modalIsOpen && (
        <ModalWindowTrailer link={trailerLink} showModal={setModalWindow} />
      )}
    </div>
  );
};
