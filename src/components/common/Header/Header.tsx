import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";



export const Header = () => {
  return (
    <header className="header flex items-center py-8 px-5">
      <div className="header__logo text-[34px] font-bold tracking-widest w-[250px]">
        <Link 
          to="/"
        >
          LOGO
        </Link>
      </div>

      <div className="flex flex-row justify-between grow">
        <form className="">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="search" className="block w-[400px] p-4 pl-10 pr-[100px] text-sm border rounded-2xl bg-gray-50 dark:bg-inherit border-gray-600 dark:placeholder-gray-400 text- focus:outline-none focus:border focus:border-blue-400 " placeholder="Search" required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700 duration-500">Search</button>
          </div>
        </form>

        <div className="header__login flex items-center gap-4 text-[26px]">
          <VscAccount  />

          <button 
            type="button" 
            className="rounded-xl text-sm px-6 py-3 bg-blue-800 hover:bg-blue-700 focus:ring-blue-800 duration-700"
          >
            LOG IN
          </button>
        </div>
      </div>
    </header>
  );
};
