// import {Ascending, Descending} from '@constant/NGContant';
import {
  Backdrop,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import React from 'react';
import {Waypoint} from 'react-waypoint';
import { EnumTableType, ITableCustom } from './types';
import { useEffectInTableCustom } from '../hooks/useEffectInTableCustom';
import { Ascending, Descending } from '../constant/TableConstant';
import { SearchTableCustom } from './SearchTableCustom';
import { EnhancedTableHeadCustom } from './HeaderCustom';
import { conditionLoadingSkeleton } from '../utils/conditionLoadingSkeleton';
import { SkeletonLoadingTableCustom } from './SkeletonLoadingTableCustom';
import { CellCustom } from './CellCustom';
import { wayPointProcess } from '../utils/wayPointProcess';
import { PaginationTableCustom } from './PaginationTableCustom';
// import {FaceToFaceProjectDateContentType} from '@/redux/slides/project-management/face-to-face/faceToFaceSlide';
// import {EnhancedTableHeadCustom} from '@components/ng-table/TableCustom/custom/header/HeaderCustom';
// import {
//   EnumTableType,
//   ITableCustom,
// } from '@components/ng-table/TableCustom/type';
// import {CellCustom} from '@components/ng-table/TableCustom/custom/cell/CellCustom';
// import {ANY, SxConstant} from '@constant/style/SxConstant';
// import {SND} from '@/i18n/lan/SingletonMergeObj';
// import {SkeletonLoadingTableCustom} from '@components/ng-table/TableCustom/custom/components/SkeletonLoadingTableCustom';
// import {SearchTableCustom} from '@components/ng-table/TableCustom/custom/components/SearchTableCustom';
// import {wayPointProcess} from '@components/ng-table/TableCustom/custom/utils/wayPointProcess';
// import {PaginationTableCustom} from '@components/ng-table/TableCustom/custom/components/PaginationTableCustom';
// import {useEffectInTableCustom} from '@components/ng-table/TableCustom/custom/hook/useEffectInTableCustom';
// import {conditionLoadingSkeleton} from '@components/ng-table/TableCustom/custom/utils/conditionLoadingSkeleton';

// export type IDataRow = FaceToFaceProjectDateContentType & {
//   typeDownloadDoc: string;
// };

export function TableCustom<
  P extends Record<string, any>,
  T extends Record<string, any>,
>({
  tableFooterType,
  handleSelectAllClick,
  headCells,
  visibleRows,
  selected,
  isCorporateAdmin = false,
  hasNext,
  handleViewDetailPage,
  emptyData,
  setFilter,
  filter,
  currentData,
  onlySearch = false,
  setVisibleRows,
  placeholder,
  tableContainerSx,
  display,
  gridLayout,
  paginationCollapse = true,
  selectedUI,
  actionReq,
  loadingSlow = false,
}: Readonly<ITableCustom<P, T>>) {
  /** ======================================================== **/
  /** hook : use effect to handle process of table custom **/
  /** ======================================================== **/
  useEffectInTableCustom<P, T>({
    tableFooterType,
    filter,
    setFilter,
    setVisibleRows,
    visibleRows,
    actionReq,
  });
  /** ============================================================================================== **/
  /**                                         gotoNextPage                                           **/
  /** ============================================================================================== **/
  const gotoNextPage = ({currentPosition}: Waypoint.CallbackArgs) => {
    if (currentPosition === 'inside') {
      setFilter({...filter, page: filter.page + 1});
    }
  };
  /** ============================================================================================== **/
  /**                                         handleRequestSort                                      **/
  /** ============================================================================================== **/
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc =
      filter.sortField === property && filter.sortDirection === Ascending;
    setFilter({
      ...filter,
      page: 1,
      sortDirection: isAsc ? Descending : Ascending,
      sortField: String(property),
    });
  };
  return (
    <Stack spacing={onlySearch ? 5 : 0}>
      {/** ============================================================================================== **/}
      {/**                         Search Option if you need                                              **/}
      {/** ============================================================================================== **/}
      <SearchTableCustom<P, T>
        onlySearch={onlySearch}
        setFilter={setFilter}
        filter={filter}
        placeholder={placeholder}
      />
      {/** ============================================================================================== **/}
      {/**                         Handle to display Table or Grid                                        **/}
      {/** ============================================================================================== **/}
      {display === EnumTableType.grid ? (
        /** ============================ **/
        /** render to show data in grid **/
        /** ============================ **/
        gridLayout
      ) : (
        <TableContainer
          sx={{
            height: `calc(100vh - ${
              onlySearch ? "590px" : "380px"
            })`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowX: "hidden",
            '&::-webkit-scrollbar': {
              width: "0.1rem",
            },
            '&::-webkit-scrollbar-track': {
              marginTop: "48px",
              marginRight: "10px",
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: "grey",
            },
            ...tableContainerSx,
          }}>
          <Table stickyHeader aria-label="sticky table" size={"small"}>
            <EnhancedTableHeadCustom<T>
              numSelected={selected.length}
              order={filter.sortDirection}
              orderBy={filter.sortField}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={visibleRows.length}
              hidden={false}
              isCorporateAdmin={isCorporateAdmin}
              headCells={headCells}
            />
            <TableBody>
              {conditionLoadingSkeleton<P, T>({
                visibleRows,
                actionReq,
                tableFooterType,
              }) ? (
                SkeletonLoadingTableCustom({
                  emptyData,
                  isLoading: actionReq.isLoading,
                  isFetching: actionReq.isFetching,
                })
              ) : (
                /** ============================ **/
                /** render to show data in table **/
                /** ============================ **/
                <>
                  <CellCustom<T>
                    visibleRows={visibleRows}
                    headCells={headCells}
                    handleViewDetailPage={handleViewDetailPage}
                    selected={selected}
                  />
                  {/** ============================================================================================== **/}
                  {/**         Waypoint will process when we scroll end of data in table for fetch more data          **/}
                  {/** ============================================================================================== **/}

                  {wayPointProcess<P, T>({
                    tableFooterType,
                    visibleRows,
                    hasNext,
                  }) && (
                    <TableRow>
                      <TableCell>
                        <Waypoint onEnter={gotoNextPage} />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/** ============================================================================================== **/}
      {/**                                        Pagination                                              **/}
      {/** ============================================================================================== **/}
      <PaginationTableCustom<P, T>
        paginationCollapse={paginationCollapse}
        setFilter={setFilter}
        filter={filter}
        tableFooterType={tableFooterType}
        currentData={currentData}
      />
      {/** ============================================================================================== **/}
      {/**                                        UI for Selected                                         **/}
      {/** ============================================================================================== **/}
      {selectedUI}
      <Backdrop
        sx={{
          color: "white",
          zIndex: th => th.zIndex.drawer + 1,
        }}
        open={loadingSlow}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Stack>
  );
}
