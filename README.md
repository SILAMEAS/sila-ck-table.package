# sila-ck-table.package

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

`sila-ck-table.package` is a flexible, highly customizable table component built with Material-UI (MUI) and powered by Redux Toolkit (RTK) Query.  
It offers advanced features like pagination, sorting, filtering, and seamless integration with backend data fetching using RTK Query.

This package is designed to simplify complex table handling in React applications, particularly when working with paginated backend APIs.

---

## Install Package
https://www.npmjs.com/package/sila-ck-table-mui-rtk-query-npm

---

## Features

- Fully customizable table columns and cell rendering
- Pagination support with flexible footer types
- Sorting and filtering capabilities
- Integration with Redux Toolkit Query for backend data fetching
- Responsive design using MUI components
- Selection support (single/multiple rows)
- Handles loading, error, and empty states gracefully

---

## Installation

Install via npm or yarn:

```bash
npm install sila-ck-table.package
# or
yarn add sila-ck-table.package


Usage Example
Here is an example of how to use the package with React, MUI, and RTK Query:



import React from 'react';
import { useTableCustom } from './hooks/useTableCustom';
import { EnumTableFooterType } from './components/types';
import { handleProcessPassingData } from './utils/handleProcessPassingData';
import { TableCustom } from './components/TableCustom';
import { Stack, Typography } from '@mui/material';

// Sample backend response data structure
const dataSample = {
  page: 1,
  pageSize: 10,
  total: 10,
  hasNext: false,
  totalPages: 1,
  contents: [
    { id: 1, name: "sila1" },
    { id: 2, name: "sila2" },
    { id: 3, name: "sila3" },
    { id: 4, name: "sila4" },
    { id: 5, name: "sila5" },
    { id: 6, name: "sila6" },
    { id: 7, name: "sila7" },
    { id: 8, name: "sila8" },
    { id: 9, name: "sila9" },
    { id: 10, name: "sila10" },
  ],
};

export type CollectionDataUserDashboard = {
  id: string | number;
  name: string;
};

const CTableExample = <CO extends CollectionDataUserDashboard>() => {
  const {
    setVisibleRows,
    visibleRows,
    selected,
    setSelected,
    handleSelectAllClick,
    filter,
    setFilter,
    tableFooterType,
  } = useTableCustom<CO>(EnumTableFooterType.pagination);

  // Simulated RTK Query response
  const { currentData } = { currentData: dataSample };

  const handleSetVisibleRows = async (propData?: typeof dataSample) => {
    if (propData) {
      const { contents, page } = propData;
      const newMap: CO[] = contents.map(item => item as CO);

      handleProcessPassingData<CO>({
        tableFooterType,
        visibleRows,
        setVisibleRows,
        newMap,
        page,
        setSelected,
      });
    }
  };

  React.useEffect(() => {
    handleSetVisibleRows(currentData).then(() => {});
  }, [currentData]);

  return (
    <TableCustom<any, CO>
      tableContainerSx={{
        height: "100%",
        width: "100%",
      }}
      setVisibleRows={setVisibleRows}
      currentData={currentData}
      setFilter={setFilter}
      filter={filter}
      actionReq={{ error: false, isLoading: false, isError: false, isFetching: false }}
      tableFooterType={tableFooterType}
      visibleRows={visibleRows}
      headCells={[
        {
          id: 'id',
          disableSort: false,
          label: "ID",
          tableCellProps: {
            align: "left",
            padding: "none",
            width: "500px",
            sx: { paddingLeft: "30px" },
          },
          tableSortLabelProps: {},
          render: data => (
            <Stack direction={"row"} alignItems={"center"} gap={"15px"} pl={"30px"}>
              <Typography>#{data.id}</Typography>
            </Stack>
          ),
        },
        {
          id: 'name',
          disableSort: false,
          label: "Name",
          tableCellProps: {
            align: "left",
            padding: "none",
            width: "500px",
            sx: { paddingLeft: "30px" },
          },
          tableSortLabelProps: {},
          render: data => (
            <Stack direction={"row"} alignItems={"center"} gap={"15px"} pl={"30px"}>
              <Typography>{data.name}</Typography>
            </Stack>
          ),
        },
      ]}
      selected={selected}
      handleSelectAllClick={handleSelectAllClick}
      hasNext={currentData?.hasNext ?? false}
      emptyData={<Typography>No Result</Typography>}
    />
  );
};

export default CTableExample;


| Prop                   | Type       | Description                          | Default    |
| ---------------------- | ---------- | ------------------------------------ | ---------- |
| `data`                 | `Array`    | Data array to display in the table   | `[]`       |
| `columns`              | `Array`    | Table column definitions and options | `[]`       |
| `sortable`             | `boolean`  | Enable or disable column sorting     | `true`     |
| `filterable`           | `boolean`  | Enable or disable filtering          | `false`    |
| `pagination`           | `boolean`  | Enable or disable pagination         | `true`     |
| `selected`             | `Array`    | Selected row keys                    | `[]`       |
| `setSelected`          | `Function` | Function to update selected rows     | `() => {}` |
| `handleSelectAllClick` | `Function` | Handler for select all checkbox      | `() => {}` |


