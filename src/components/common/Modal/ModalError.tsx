import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TbMovieOff } from 'react-icons/tb';


type Props = {
  text: string,
};

export const ModalError: React.FC<Props> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[ref]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70 backdrop-blur-[2px]">
      <div ref={ref} className="relative rounded-lg shadow bg-gray-700 bg-opacity-70">
        <div className="p-6 flex flex-col gap-3 items-center ">
            <TbMovieOff className="text-[34px]"/>
            <h3 className="font-normal text-gray-500 dark:text-gray-400">
              Oops, something went wrong!
            </h3>
            <span>{text}</span>
            <button
              className="px-5 py-2 mt-2 text-[16px] rounded-lg bg-blue-800 hover:bg-blue-700 duration-700"
              onClick={goBack}
            >
              Go Back
            </button>
        </div>
      </div>
    </div>
  );
};
