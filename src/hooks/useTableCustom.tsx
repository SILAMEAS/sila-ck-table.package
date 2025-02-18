import React, {useState} from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {TableCellProps} from '@mui/material';
import { Descending } from '../constant/TableConstant';
import { EnumTableFooterType, FilterBy, IFilterTableCustom, ISortFieldUser } from '../components/types';
import useWindowSize from './useWindowSize';

const defaultFilter: IFilterTableCustom = {
  page:1,
  pageSize: 10,
  sortDirection: Descending,
  sortField: 'id',
  sortByField: 'id',
  filterBy: FilterBy.ENDUSER,
  search: '',
};


export const useTableCustom = <T extends Record<string, any>>(
  tableFooterType: EnumTableFooterType,
) => {
  /** state */
  const location = useLocation();
  const navigate = useNavigate();
  const {userId} = useParams();
  const [searchParam] = useSearchParams();
  const flowId = searchParam.get('flowId');
  const [status, setStatus] = useState<string[]>(['']);
  const windowSize = useWindowSize();
  const [filter, setFilter] = useState<IFilterTableCustom>(defaultFilter);
  const [visibleRows, setVisibleRows] = useState<Array<T>>([]);
  const [selected, setSelected] = React.useState<
    Readonly<Array<number | string>>
  >([]);
  const [toggle, setToggle] = useState<boolean>(true);
  const actionDataOutSide = {
    error: false,
    isLoading: false,
    isError: false,
    isFetching: false,
  };
  const tempCol = [
    {
      id: 'temp',
      disableSort: false,
      hidden: true,
      label: '',
      tableCellProps: {},
      stopPropagation: true,
      tableSortLabelProps: {},
      render: () => <></>,
    },
  ];
  const localTableCellProps: TableCellProps = {
    align: "left",
    padding: "none",
    sx: {
      minWidth: "170px",
      width: "auto",
    },
  };
  /** function */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const checkStatus = (s: string) => {
    switch (s) {
      case 'IN_PROGRESS': {
        return 0;
      }
      case 'COMPLETED': {
        return 1;
      }
      default: {
        return -1;
      }
    }
  };
  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: Array<string | number> = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const toggleCollageRow = (id: string) => {
    setVisibleRows(prevData => {
      const newData = [...prevData];
      const index = newData.findIndex(item => item.id === id);
      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          showExtendsRow: !newData.find(k => k.id === id)?.showExtendsRow,
        };
      }
      return newData;
    });
  };
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const fieldDirectionInfiniteScroll = () => {
    if (tableFooterType === EnumTableFooterType.infiniteScroll) {
      return {sortField: 'id', sortDirection: Descending};
    } else {
      return {
        sortField: filter.sortField as ISortFieldUser,
        sortDirection: filter.sortDirection,
      };
    }
  };

  return {
    visibleRows,
    selected,
    navigate,
    filter,
    tableFooterType,
    windowSize,
    userId,
    status,
    actionDataOutSide,
    flowId,
    toggle,
    localTableCellProps,
    tempCol,
    location,
    fieldDirectionInfiniteScroll,
    toggleCollageRow,
    setToggle,
    setVisibleRows,
    handleSelectAllClick,
    setSelected,
    setFilter,
    setStatus,
    checkStatus,
    handleClick,
    isSelected,
    isInfiniteScroll: tableFooterType === EnumTableFooterType.infiniteScroll,
  };
};
