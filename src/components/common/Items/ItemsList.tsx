/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from "react-router-dom";
// types
import { Movie } from "../../../types/Movie";
import { TV } from "../../../types/TV";
import { Multi } from "../../../types/Multi";
// components
import { Pagination } from "../Pagination/Pagination";
import { ItemCard } from "../Item/ItemCard";
import { FilterItems } from "../Filter.tsx/FilterItems";


type Props = {
  items: Movie[] | TV[] | Multi[],
  totalPages: number,
  title: string,
  params?: any,
  filterItems?: boolean,
};


export const ItemsList: React.FC<Props> = ({ items, totalPages, title, params, filterItems }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 w-full">
        <h3 className="text-[30px] font-bold">
          {title}
        </h3>

        {filterItems && (
          <FilterItems type={items[0].type} />
        )}

        <div className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {items.map(item => (
            <div key={item.id}>
              <ItemCard type={item.type} item={item} />
            </div>
          ))}
        </div>
      </div>

      {totalPages !== 1 && (
        <Pagination
          linkLocationState={params}
          totalPages={totalPages}
          page={+page}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};
