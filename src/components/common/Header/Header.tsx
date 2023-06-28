import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { api } from "../../../api/fetchData";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiSearch } from "react-icons/hi";

import './Header.scss'
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";


export const Header = () => {
  const [query, setQuery] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const location = useLocation();
    
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

  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="sticky top-0 z-50">
      <div className="container header">
        <div className="header__logo logo">
          <Link
            className="logo__text" 
            to="/"
          >
            LOGO
          </Link>
          <button
            className="logo__burger"
            onClick={() => setIsMenuOpen(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>

        <form
          onSubmit={searchByQuery} 
          autoComplete="off" 
          className="header__search search col-span-4 xl:col-span-3 md:col-span-6"
        >
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

        <div className="header__login login">
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


        <BurgerMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

    </header>
  );
};
