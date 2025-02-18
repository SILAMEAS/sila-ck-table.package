import {
  Box,
  TableCell,
  TableCellProps,
  TableHead,
  TableRow,
  TableSortLabel,
  TableSortLabelProps,
  Typography,
} from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {visuallyHidden} from '@mui/utils';
import { Order } from './types';
import { Ascending, Descending, styleInTable } from '../constant/TableConstant';
import { uniqueArray } from '../utils/handleProcessPassingData';

export interface HeadCellCustom<T> {
  id: keyof T;
  label: string | React.ReactNode;
  disableSort: boolean;
  tableCellProps: TableCellProps;
  tableBodyCellProps?: TableCellProps;
  tableSortLabelProps: TableSortLabelProps;
  hidden?: boolean;
  render?: (props: T, index?: number) =>React.ReactNode;
  extendsRow?: (props: T, index?: number) => React.ReactNode;
  stopPropagation?: boolean;
  noPaddingRow?: boolean;
}

interface EnhancedTablePropsCustom<T> {
  headCells: HeadCellCustom<T>[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  hidden?: boolean;
  isCorporateAdmin?: boolean;
}

export function EnhancedTableHeadCustom<T>(
  props: Readonly<EnhancedTablePropsCustom<T>>,
) {
  const {order, orderBy, onRequestSort, headCells} = props;

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const iconSort = () => {
    if (order === Ascending) {
      return <ArrowDropDownIcon sx={{fontSize: '15px'}} />;
    } else {
      return <ArrowDropUpIcon sx={{fontSize: '15px'}} />;
    }
  };
  return (
    <TableHead sx={{visibility: props.hidden ? 'collapse' : 'visible'}}>
      <TableRow
        style={{
          height: '48px',
        }}>
        {uniqueArray<HeadCellCustom<T>>(headCells, 'id')?.map(headCell => (
          <TableCell
            {...headCell.tableCellProps}
            sx={{
              ...headCell.tableCellProps.sx,
              display: headCell.hidden ? 'none' : 'visible',
            }}
            key={headCell.id as string}
            sortDirection={orderBy === headCell.id ? order : false}>
            {headCell.disableSort ? (
              <Typography sx={{...styleInTable, cursor: 'pointer', mr: 2}}>{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                {...headCell.tableSortLabelProps}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : Ascending}
                hideSortIcon={orderBy !== headCell.id}
                IconComponent={iconSort}
                onClick={createSortHandler(headCell.id)}>
                  <Typography sx={{...styleInTable, cursor: 'pointer', mr: 2}}>{headCell.label}</Typography>
              
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === Descending
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
