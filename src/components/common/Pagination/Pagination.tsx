import React, {useMemo} from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getSearchWith } from "../../../utils/getSearchParams";

import "./Pagination.scss"

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";


type Props = {
  linkLocationState?: Record<string, string | number>,
  totalPages: number,
  page: number,
  searchParams: URLSearchParams,
}

export const Pagination: React.FC<Props> = ({ linkLocationState = {}, totalPages, page, searchParams }) => {
  const paginationLinks = useMemo<number[]>(() => {
    switch (true) {
      case totalPages < 5:
        return new Array(totalPages).fill(1).map((a, b) => b + 1);

      case page <= 3:
        return new Array(5).fill(1).map((a, b) => b + 1);

      case page >= totalPages - 2:
        return new Array(5).fill(1).map((a, b) => totalPages - 4 + b);


      default:
        return new Array(5).fill(1).map((a, b) => page - 2 + b);
    }
  }, [page, totalPages]);

  const previousPage = () => {
    if (page !== 1) {
       return (page - 1);
    }

    return page;
  };

  const nextPage = () => {
    if (page !== totalPages) {
      return (page + 1);
    }

    return page;
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: 1})}}
            state={linkLocationState}
            className="nav__link rounded-l-[12px]"
          >
            <MdOutlineKeyboardDoubleArrowLeft className="nav__icon" />
          </Link>
        </li>
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: previousPage()})}}
            state={linkLocationState}
            className="nav__link"
          >
            <MdOutlineKeyboardArrowLeft className="nav__icon" />
          </Link>
        </li>
        {paginationLinks.map(number => (
          <li key={number} className={classNames({"md:hidden": page !== number})}>
            <Link 
              to={{ search: getSearchWith(searchParams, {page: String(number)})}}
              state={linkLocationState}
              className={classNames(
                "nav__link nav__link_page",
                {"nav__link_active": page === number},
              )}
            >
              {number}
            </Link>
          </li>
        ))}
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: nextPage()})}}
            state={linkLocationState}
            className="nav__link"
          >
            <MdOutlineKeyboardArrowRight className="nav__icon" />
          </Link>
        </li>
        <li>
          <Link 
            to={{ search: getSearchWith(searchParams, {page: totalPages})}}
            state={linkLocationState}
            className="nav__link rounded-r-[12px] border-none"
          >
            <MdOutlineKeyboardDoubleArrowRight className="nav__icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
