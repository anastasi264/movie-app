import { Movie, Series} from "../../../types/Movie";
import { ItemCard } from "../Item/ItemCard";

type Props = {
  type: string,
  items: Movie[] | Series[],
};

export const ItemsList: React.FC<Props> = ({ type, items}) => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <h3 className="text-[34px] font-bold">
        {`Discover ${type.slice(0, 1).toUpperCase() + type.slice(1)}`}
      </h3>
      <div className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto">
        {items.map(item => (
          <ItemCard type={type} item={item} />
        ))}
      </div>
    </div>
  );
}
