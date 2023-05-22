import React, {useMemo} from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getSearchWith } from "../../../utils/getSearchParams";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";


type Props = {
  page: number,
  searchParams: URLSearchParams,
  pageNumbers: number,
}

export const Pagination: React.FC<Props> = ({ page, searchParams, pageNumbers }) => {
  const paginationLinks = useMemo<number[]>(() => {
    switch (true) {
      case page <= 3:
        return new Array(5).fill(1).map((a, b) => b + 1);

      case page >= pageNumbers - 2:
        return new Array(5).fill(1).map((a, b) => pageNumbers - 4 + b);

      default:
        return new Array(5).fill(1).map((a, b) => page - 2 + b);
    }
  }, [page, pageNumbers]);

  const previousPage = () => {
    if (page !== 1) {
       return (page - 1);
    }

    return page;
  };

  const nextPage = () => {
    if (page !== pageNumbers) {
      return (page + 1);
    }

    return page;
  };

  return (
    <nav className="mx-[auto] my-8">
      <ul className="inline-flex p-5">
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: 1})}}
            className="p-4 rounded-l-[12px] bg-gray-800 border-r border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white duration-500"
          >
            <MdOutlineKeyboardDoubleArrowLeft className="inline text-[22px] text-gray-300"/>
          </Link>
        </li>
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: previousPage()})}}
            className="p-4 bg-gray-800 border-r border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white duration-500"
          >
            <MdOutlineKeyboardArrowLeft className="inline text-[22px] text-gray-300"/>
          </Link>
        </li>
        {paginationLinks.map(number => (
          <li>
            <Link 
              to={{ search: getSearchWith(searchParams, {page: String(number)})}}
              className={classNames(
                "py-4 px-6 border-r border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white duration-300",
                {"bg-blue-600 text-white": page === number},
                {"bg-gray-800": page !== number},
              )}
            >
              {number}
            </Link>
          </li>
        ))}
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: nextPage()})}}
            className="p-4 bg-gray-800 border-r border-gray-700 text-gray-400 hover:bg-blue-600 hover:text-white duration-500"
          >
            <MdOutlineKeyboardArrowRight className="inline text-[22px] text-gray-300"/>
          </Link>
        </li>
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: pageNumbers})}}
            className="p-4 rounded-r-[12px] bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white duration-500"
          >
            <MdOutlineKeyboardDoubleArrowRight className="inline text-[22px] text-gray-300"/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
