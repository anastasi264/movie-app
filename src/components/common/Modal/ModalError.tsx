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

      navigate(-1);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[navigate, ref]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70 backdrop-blur-[2px]">
      <div ref={ref} className="relative rounded-lg shadow bg-gray-700 bg-opacity-70">
        <div className="p-6 flex flex-col gap-3 items-center ">
            <TbMovieOff className="text-5xl lg:text-4xl" />
            <span className="text-gray-500 dark:text-gray-400 text-center">
              Oops, something went wrong!
            </span>
            <span className="text-center">
              {text}
            </span>
            <button
              className="px-5 py-2 mt-2 rounded-lg bg-blue-800 hover:bg-blue-700 duration-700"
              onClick={goBack}
            >
              Go Back
            </button>
        </div>
      </div>
    </div>
  );
};
