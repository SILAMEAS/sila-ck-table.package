import {  ITableCustom } from "../components/types";
import EnumTableFooterType from "../constant/enum/EnumTableFooterType";


type typePick = 'tableFooterType' | 'visibleRows' | 'actionReq';
interface IConditionLoadingSkeleton<P, T>
  extends Pick<ITableCustom<P, T>, typePick> {}
/** =================================================================================== **/
/** fun :  condition for loading skeleton for table type pagination and infinite scroll **/
/** =================================================================================== **/
export function conditionLoadingSkeleton<
  P extends Record<string, any>,
  T extends Record<string, any>,
>({tableFooterType, visibleRows, actionReq}: IConditionLoadingSkeleton<P, T>) {

  if (tableFooterType === EnumTableFooterType.pagination) {
    return visibleRows.length <= 0 || actionReq.isFetching;
  } else {
    return visibleRows.length <= 0;
  }
}
