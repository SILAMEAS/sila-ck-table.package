import { SxProps, TableCellProps } from "@mui/material";


export type Sort = 'asc' | 'desc';
export const Ascending: Sort = 'asc';
export const Descending: Sort = 'desc';
export const EntryPerPage = 10;
export const RowsPerPageOptions = [
 10,
  20,
  50,
  100,
];

export enum typeSort {
  asc = 'asc',
  des = 'desc',
}

export const sortDescending = 'sorted descending';
export const sortAscending = 'sorted ascending';
export const styleInTable: SxProps = {
  fontWeight: 500,
  fontSize: 12,
  // textTransform: 'capitalize',
};

export const localTableCellProps: TableCellProps = {
  align: 'left',
  padding: 'none',
  sx: {
    minWidth: '150px',
    width: 'auto',
  },
};