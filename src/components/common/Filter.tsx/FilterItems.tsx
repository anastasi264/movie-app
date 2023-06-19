/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"; 
import { api } from "../../../api/fetchData";

import { RxReset } from 'react-icons/rx';
import { getSearchWith } from "../../../utils/getSearchParams";
import { useSearchParams } from "react-router-dom";
import { OptionType, Select } from "./Select";
import { sortTypes } from "./SortTypes";

import DatePicker from "react-multi-date-picker";
import type{Value} from "react-multi-date-picker";
import "./datePickerStyles.scss";
import { Genre } from "../../../types/Movie";

type Props = {
  type: "movies" | "tv",
};

export const FilterItems: React.FC<Props> = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState<OptionType[]>([]);
  
  const selectedSortType = sortTypes.find(type => type.value === searchParams.get('sort'));
  const selectedGenre = genres.find(genre => genre.value === searchParams.get('genre'));
  
  const year = searchParams.get('year') || 'Year';
  const [yearValue, setYearValue] = useState<Value>(new Date(+year, 1, 1));

  const fetchGenres = async () => {
    try {
      let genresFromServer;

      switch (type) {
        case 'movies':
          genresFromServer = await api.get.media.genres("movie");
          break;

        case 'tv':
          genresFromServer = await api.get.media.genres("tv");
          break;
      }

      setGenres(
        genresFromServer.genres.map(
          (genre: Genre) => ({ name: genre.name, value: `${genre.id}` })
        )
      );
    } catch {
    } finally {
    }
  };

  const handleResetParams = () => {
    setSearchParams(getSearchWith(searchParams, {
      page: null,
      sort: null,
      genre: null,
      year: null,
    }));
  };

  const handleSetYear = (year: any) => {
    setYearValue(year);

    searchParams.set('year', year);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="filters flex gap-5">
      <Select
        options={sortTypes}
        label="Sort"
        selected={selectedSortType}
      />
      
      <Select
        options={genres}
        label="Genre"
        selected={selectedGenre}
      />

      <DatePicker 
        onlyYearPicker
        inputClass='py-2 min-w-[full] text-gray-400  bg-transparent border-b-2 border-gray-700 focus:outline-none'
        className="bg-dark"
        minDate="1900"
        maxDate="2023" 
        placeholder="Year"
        value={yearValue}
        onChange={(date: any) => handleSetYear(date.year)}
      />

      <button
        type="button"
        className="flex gap-2 items-center rounded-[24px] text-black text-[16px] px-6 bg-yellow-600 hover:bg-yellow-500 duration-700"
        onClick={handleResetParams}
      >
        <span>Reset</span>
        <span><RxReset /></span>
      </button>
    </div>
  );
};
