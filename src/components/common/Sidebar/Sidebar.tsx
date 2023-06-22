import { NavLink, useLocation } from "react-router-dom";
import { navLinks } from "./NavigationLinks";
import classNames from "classnames";
import { Account } from "./Account";

import './Sidebar.scss'


export const Sidebar = () => {
  const { pathname } = useLocation();


  return (
    <div className="pr-10 lg:pr-5 flex flex-col h-full justify-between">
      <nav className="flex flex-col">
        <p
          className="mb-5 text-gray-400 font-bold">
          Menu
        </p>
        <ul className="flex flex-col gap-2">
          {navLinks.map(link => (
            <li key={link.title}>
              {link.title === 'Favourites' && (
                <hr className="opacity-20 h-[1px] w-[75%] my-3"/>
              )}
              <NavLink 
                to={link.path}
                className={({ isActive }) => (
                  classNames(
                    'flex items-center gap-3 p-2 hover:scale-105 duration-500',
                    {'group text-gray-500 hover:text-inherit': !isActive},
                    {'text-inherit bg-gray-600 bg-opacity-20 rounded-lg': isActive}
                  )
                )}
              >
                <span
                  className={classNames(
                    'icon group-hover:text-blue-700 duration-500',
                    {'text-blue-700': pathname.toLowerCase().includes(link.path)}
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
      <Account />
    </div>
  );
};


