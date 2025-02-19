import React from 'react';
import uniqueArray from './uniqueArray';
import EnumTableFooterType from '../constant/enum/EnumTableFooterType';

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


export default function handleProcessPassingData<CO extends Record<string, any>>({
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
