import { useRef } from "react";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import { Similars } from "../../../types/Movie";
import { ItemCard } from "../Item/ItemCard";

type Props = {
  type?: string,
  items: Similars[] | null,
};
 
export const Slider: React.FC<Props> = ({ type, items }) => { 
  const slider = useRef<HTMLDivElement>(null);
  let position = 0;
  
  const prevHandler = () => {
    if (position !== 0) {
      position += 492;
    }
 
    changePosition(position);
  };
  
  const nextHandler = () => {  
    if (items && position <= -(items.length - 5) * 254) {
      position = 0;
    } else {
      position -= 492;
    }

    changePosition(position);
  };

  const changePosition = (position: number) => {
    if (slider.current) {
      const childNodes: NodeListOf<HTMLElement> = slider.current.childNodes as NodeListOf<HTMLElement>;

      childNodes.forEach(element => {
        element.style.transform = `translateX(${position}px)`;
      });
    }
  };
  
  return (
    <div className="slider max-w-[1240px] relative">
      <div
        ref={slider}
        className="slider-track p-3 h-full flex gap-4 justify-between overflow-hidden"
      >
        {items?.map(item => {
          if (item.poster_path) {
            return (
              <ItemCard type={type} item={item} />
            );
          }
        }
        )}
      </div>
      <button 
        className="absolute p-4 left-[-40px] top-[30%] text-[70px] font-bold hover:text-yellow-500 duration-700"
        onClick={prevHandler}
      >
        <RiArrowLeftCircleFill />
      </button>
      <button
        className="absolute p-3 right-[-33px] top-[30%] text-[70px] font-bold hover:text-yellow-500 duration-700"
        onClick={nextHandler}
      >
        <RiArrowRightCircleFill />
      </button>
    </div>
  );
};
