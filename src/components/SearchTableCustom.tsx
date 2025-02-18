import { SearchFormTableCustom } from "./NGSearch";
import { ITableCustom } from "./types";

type typePick = 'setFilter' | 'filter' | 'placeholder' | 'onlySearch';
interface ISearchTableCustom<P, T> extends Pick<ITableCustom<P, T>, typePick> {}
export function SearchTableCustom<
  P extends Record<string, any>,
  T extends Record<string, any>,
>({
  onlySearch,
  setFilter,
  filter,
  placeholder,
}: Readonly<ISearchTableCustom<P, T>>) {
  return (
    <>
      {onlySearch && (
        <SearchFormTableCustom
          setFilter={setFilter}
          filter={filter}
          placeholder={placeholder}
        />
      )}
    </>
  );
}
