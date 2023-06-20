import classNames from "classnames";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { useEffect, useRef  } from "react";

import "./BurgerMenu.scss"

type Props = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  },[ref, setIsOpen]);

  return (
    <>
      <div
        className={classNames(
          "absolute top-0 left-0 right-0 h-screen flex justify-start z-50",
          {'-translate-x-[100vw]': !isOpen},
          {'bg-opacity-70 backdrop-blur-[3px]': isOpen}
          )}
          >
      </div>

      <div ref={ref} className={classNames(
        "menu",
        {'-translate-x-[100vw]': !isOpen},
        {'translate-x-0': isOpen}
      )}>
        <Link
          className="menu__link" 
          to="/"
        >
          LOGO
        </Link>
        <Sidebar />
      </div>
    </>
  );
};
