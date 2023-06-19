import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { api } from "../../../api/fetchData";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiSearch } from "react-icons/hi";

import './Header.scss'


export const Header = () => {
  const [query, setQuery] = useState<string>('');
  
  const activeSession = localStorage.getItem('session_id');

  const navigate = useNavigate();
 
  const searchByQuery = () => {
    navigate(`/search?query=${query}`);
    setQuery('');
  };

  const authenticateUser = () => {
    if (activeSession) {
      api.delete.session({session_id: activeSession});
      localStorage.removeItem('session_id');
      localStorage.removeItem('token');
      window.location.reload();
    } else {
        navigate(`/authentication/step-1`);
    }
  };
 
  return (
    <div className="container mx-auto grid grid-cols-6 items-center py-8 md:py-4">
      <div className="logo">
        <Link
          className="logo__text" 
          to="/"
        >
          LOGO
        </Link>
        <button
          className="logo__burger"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      <div className="flex flex-row justify-between col-span-5">
        <form onSubmit={searchByQuery} autoComplete="off" className="search md:w-full">
          <div className="relative" >
            <div className="search__icon">
              <HiSearch />
            </div>
            <input
              type="search"
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="search__input"
              placeholder="Search"
              required 
            />
            <button type="submit" className="search__button">
              <span className="sm:hidden">
                Search
              </span>
              <span className="hidden text-lg sm:block">
                <HiSearch />
              </span>
            </button>
          </div>
        </form>

        <div className="login">
          <VscAccount className="login__icon" onClick={() => authenticateUser()} />

          <button 
            type="button" 
            className="login__button"
            onClick={() => authenticateUser()}
          >
            {activeSession ? 'LOG OUT' : 'LOG IN'}
          </button> 
        </div>
      </div>
    </div>
  );
};
