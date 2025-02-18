import React from 'react';
import { EnumTableFooterType, ITableCustom } from '../components/types';
import { useSnackbar } from 'notistack';
import { getComparator, stableSort } from '../constant/TableOperator';
type typePick =
  | 'tableFooterType'
  | 'setVisibleRows'
  | 'setFilter'
  | 'filter'
  | 'visibleRows'
  | 'actionReq';
interface IuseEffectInTableCustom<P, T>
  extends Pick<ITableCustom<P, T>, typePick> {}
export const useEffectInTableCustom = <
  P extends Record<string, any>,
  T extends Record<string, any>,
>({
  tableFooterType,
  actionReq: {isError, error},
  filter,
  setFilter,
  setVisibleRows,
  visibleRows,
}: Readonly<IuseEffectInTableCustom<P, T>>) => {
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  React.useEffect(() => {
    if (isError) {
      enqueueSnackbar(
        error?.status??"UNKONW",
        {
          variant: 'error',
        },
      );
    }
    return () => closeSnackbar();
  }, [isError]);
  React.useEffect(() => {
    if (tableFooterType === EnumTableFooterType.infiniteScroll) {
      setFilter({...filter, page: 1});
      setVisibleRows(
        stableSort(
          visibleRows,
          getComparator(filter.sortDirection, filter.sortField),
        ),
      );
    }
  }, [filter.sortDirection, filter.sortField]);
};
