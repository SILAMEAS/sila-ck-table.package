import {

  TableCellProps,
  TableSortLabelProps,
} from '@mui/material';
import React from 'react';
export enum FilterBy {
  COMPANY = 'company',
  DEPARTMENT = 'department',
  ENDUSER = 'user',
  CreateFromZero = 'create-project-form-zero',
  CreateFromCampaign = 'create-project-form-campaign',
  Defautl = 'default',
}
export type ISortFieldUser =
  | 'totalProjects'
  | 'id'
  | 'percentage'
  | 'user'
  | 'totalConnections';
export interface IFilterTableCustom {
  page: number;
  pageSize: number;
  statuses?: string[];
  sortDirection: 'desc' | 'asc';
  search?: string;
  startDate?: string;
  endDate?: string;
  sortByField?: string;
  sortField: string;
  filterBy?: FilterBy | string;
}

import {SxProps} from '@mui/material';
import { Ascending, Descending } from '../constant/TableConstant';
import EnumTableFooterType from '../constant/enum/EnumTableFooterType';
import EnumTableType from '../constant/enum/EnumTableType';
export interface HeadCellCustom<T> {
  id: keyof T;
  label: string | React.ReactNode;
  disableSort: boolean;
  tableCellProps: TableCellProps;
  tableBodyCellProps?: TableCellProps;
  tableSortLabelProps: TableSortLabelProps;
  hidden?: boolean;
  render?: (props: T, index?: number) => React.ReactNode;
  extendsRow?: (props: T, index?: number) => React.ReactNode;
  stopPropagation?: boolean;
  noPaddingRow?: boolean;
}


export interface ITableCustom<P, T> {
  emptyData?: React.ReactNode;
  tableFooterType: EnumTableFooterType;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  headCells: HeadCellCustom<T>[];
  visibleRows: T[];
  setVisibleRows: React.Dispatch<React.SetStateAction<T[]>>;
  selected: Readonly<Array<string | number>>;
  isCorporateAdmin?: boolean;
  hasNext: boolean;
  actionReq: {
    isFetching: boolean;
    isError: boolean;
    error: any;
    isLoading: boolean;
  };
  handleViewDetailPage?: (dataProps: T) => void;
  filter: IFilterTableCustom;
  setFilter: React.Dispatch<React.SetStateAction<IFilterTableCustom>>;
  currentData?: P;
  onlySearch?: boolean;
  placeholder?: string;
  tableContainerSx?: SxProps;
  gridLayout?: React.ReactNode;
  display?: EnumTableType;
  paginationCollapse?: boolean;
  selectedUI?: React.ReactNode;
  loadingSlow?: boolean;
}
export interface ICellCustom<R> {
  visibleRows: R[];
  handleViewDetailPage?: (dataProps: R) => void;
  headCells: HeadCellCustom<R>[];
  selected: Readonly<Array<string | number>>;
}
const OrderDirection = [Ascending, Descending] as const;
export type Order = (typeof OrderDirection)[number];