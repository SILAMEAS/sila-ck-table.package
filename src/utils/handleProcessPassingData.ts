import React from 'react';
import { EnumTableFooterType } from '../components/types';

interface IHandleProcessPassingData<CO> {
  tableFooterType: EnumTableFooterType;
  visibleRows: CO[];
  newMap: CO[];
  setVisibleRows: (value: React.SetStateAction<CO[]>) => void;
  page: number;
  setSelected: React.Dispatch<
    React.SetStateAction<Readonly<Array<number | string>>>
  >;
  search?: string;
}
export const uniqueArray = <T extends Record<string, any>>(
  visibleRows: T[],
  K: keyof T,
): Array<T> =>
  Array.from(new Map(visibleRows.map(item => [item[K], item])).values());
export const uniqueElementsTwoArrays = <
  A1 extends Record<string, any>,
  A2 extends Record<string, any>,
>(
  array1: A1[],
  array2: A2[],
  K: keyof A1 | keyof A2,
) => {
  const arrays = [...array1, ...array2];
  return uniqueArray<any>(arrays, K);
};

export function handleProcessPassingData<CO extends Record<string, any>>({
  tableFooterType,
  newMap,
  visibleRows,
  setVisibleRows,
  page,
  setSelected,
  search,
}: IHandleProcessPassingData<CO>) {
  switch (tableFooterType) {
    case EnumTableFooterType.infiniteScroll: {
      const result = newMap.filter(obj1 =>
        visibleRows?.every(obj2 => obj1.id !== obj2.id),
      );
      if ((!search || search === '') && page !== 1) {
        setVisibleRows(uniqueArray<CO>(visibleRows.concat(result), 'id'));
        break;
      } else {
        setVisibleRows(newMap);
        break;
      }
    }
    case EnumTableFooterType.pagination:
    case EnumTableFooterType.list: {
      setSelected([]);
      if (newMap) {
        setVisibleRows([]);
      }
      setVisibleRows(newMap);
      break;
    }
    default: {
      break;
    }
  }
}
