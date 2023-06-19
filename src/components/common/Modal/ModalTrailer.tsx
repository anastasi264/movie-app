import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = {
  link: string,
  showModal: Dispatch<SetStateAction<boolean>>,
};


export const ModalTrailer: React.FC<Props> = ({ link, showModal }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
  
      showModal(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[showModal, ref]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70 backdrop-blur-[2px]">
      <div ref={ref} className="relative">
        <iframe
          className="w-[900px] aspect-video rounded-2xl" 
          src={`https://www.youtube.com/embed/${link}`} 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; enclasscrypted-media; gyroscope; picture-in-picture; web-share" 
        />
      </div>
    </div>
  );
};
