import { useState, useRef, useEffect } from "react"; 
import { useSearchParams } from "react-router-dom";

export interface OptionType {
  name: string,
  value: string,
}

type Props = {
  options: OptionType[],
  label: string,
  selected?: OptionType,
};

export const Select: React.FC<Props> = ({ options, selected, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
  
      setOpenSelect(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[openSelect, ref]);


  return (
    <div 
      ref={ref}
      className="relative flex flex-col gap-2 py-2 w-full text-gray-400 border-b-2 border-gray-700 "
    >
      <div
        className="cursor-pointer "
        onClick={() => setOpenSelect(!openSelect)}
      >
        {selected?.name || label}
      </div>
      <div className="absolute inset-x-0 top-14 p-y-2 flex flex-col z-10 max-h-56 max-w-full bg-gray-900 bg-opacity-90 overflow-auto">
        {openSelect && options?.map(option => (
          <div
            onClick={() => {
              searchParams.set(label.toLowerCase(), option.value);
              setSearchParams(searchParams)
            }}
            className="cursor-pointer text-gray-300 dark:hover:bg-[#0074D9]"
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};
