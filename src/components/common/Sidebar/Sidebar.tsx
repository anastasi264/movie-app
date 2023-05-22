import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "./NavigationLinks";
import classNames from "classnames";


export const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  

  return (
    <aside className="grow-0 min-w-[250px] p-5 ">
      <nav className="">
        <p className="mb-8 text-[#757379] font-bold">
          Menu
        </p>

        <ul className="flex flex-col gap-5 ">
          {navLinks.map(link => (
            <li>
              <NavLink 
                to={link.path}
                className={({ isActive }) => (
                  classNames(
                    'flex items-center gap-3 group text-[20px] text-[#757379] hover:text-[#EFEFEF] hover:scale-105 active:text-[#9b9999] duration-500',
                    {'text-[#EFEFEF] scale-110 translate-x-4': isActive}
                  )
                )}
              >
                <span
                  className={classNames(
                    'icon group-hover:text-blue-700 duration-500',
                    // {'text-blue-700': pathname.toLowerCase().includes(link.path)}
                  )}
                >
                  {link.icon}
                </span>
                <span>{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};


