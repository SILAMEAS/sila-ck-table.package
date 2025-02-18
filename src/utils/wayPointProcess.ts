import { EnumTableFooterType, ITableCustom } from "../components/types";


type typePick = 'tableFooterType' | 'hasNext' | 'visibleRows';
interface IWayPointProcess<P, T> extends Pick<ITableCustom<P, T>, typePick> {}
export function wayPointProcess<
  P extends Record<string, any>,
  T extends Record<string, any>,
>({tableFooterType, hasNext, visibleRows}: Readonly<IWayPointProcess<P, T>>) {

  return (
    tableFooterType === EnumTableFooterType.infiniteScroll &&
    visibleRows.length > 0 &&
    hasNext
  );
}
