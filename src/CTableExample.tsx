import React from 'react';
import { useTableCustom } from './hooks/useTableCustom';
import { EnumTableFooterType } from './components/types';
import { handleProcessPassingData } from './utils/handleProcessPassingData';
import { TableCustom } from './components/TableCustom';
import { Stack, Typography } from '@mui/material';
/**
 * Data sample of backend response
 export interface CampaignProjectData {
  contents: CorporateSignatureProject[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  totalPages: number;
}
 * **/ 
const dataSample={
    page:1,
    pageSize:10,
    total:10,
    hasNext:false,
    totalPages:1,
    contents:[
        {id:1,name:"sila1"},
        {id:2,name:"sila2"},
        {id:3,name:"sila3"},
        {id:4,name:"sila4"},
        {id:5,name:"sila5"},
        {id:6,name:"sila6"},
        {id:7,name:"sila7"},
        {id:8,name:"sila8"},
        {id:9,name:"sila9"},
        {id:10,name:"sila10"},
    ]
}
export type CollectionDataUserDashboard = {
  id: string | number;
name:string
};
const CTableExample = <CO extends CollectionDataUserDashboard>() =>
  // props: Readonly<ITableUser>,
  {
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
    /**
     Note : useGetUserByCompanyQuery is rtk query
       const {currentData, isFetching, isError, error, isLoading} =
      useGetUserByCompanyQuery({
        ...filter,
        sortField:
          EnumTableFooterType.pagination === 'pagination'
            ? 'id'
            : (filter.sortField as ISortFieldUser),
        sortDirection:
          EnumTableFooterType.pagination === 'pagination'
            ? Descending
            : filter.sortDirection,
        page: filter.page,
        pageSize: filter.pageSize,
        search: '',
        // departmentId: 2,
      });
     * */ 
    
    const {currentData, isFetching, isError, error, isLoading} ={currentData:dataSample,error:false,isFetching:false,isError:false,isLoading:false}
// DocumentTableInterface is type of end point response
// const handleSetVisibleRows = async (propData?: DocumentTableInterface)
    const handleSetVisibleRows = async (propData?: typeof dataSample) => {
      if (propData) {
        const {contents, page} = propData;
        const newMap: CO[] = contents.map(item => {
          return item as CO;
        });

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
        //<TableCustom<DocumentTableInterface, CO>
      <TableCustom<any, CO>
        tableContainerSx={{
          height:"100%",
            width:"100%"
        }}
        setVisibleRows={setVisibleRows}
        currentData={currentData}
        setFilter={setFilter}
        filter={filter}
        actionReq={{error, isLoading, isError, isFetching}}
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
                width:"500px",
                sx:{
                    paddingLeft:"30px"
                }
            },
            tableSortLabelProps: {},
            render: data => (
              <Stack
                direction={"row"}
                alignItems={"center"}
                gap={"15px"} pl={"30px"}>
                    <Typography>
                        # {data.id}
                    </Typography>
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
                    width:"500px",
                    sx:{
                        paddingLeft:"30px"
                    }
                },
                tableSortLabelProps: {},
                render: data => (
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        gap={"15px"} pl={"30px"}>
                        <Typography>
                            {data.name}
                        </Typography>
                    </Stack>
                ),
            }
        ]}
        selected={selected}
        handleSelectAllClick={handleSelectAllClick}
        hasNext={currentData?.hasNext ?? false}
        emptyData={
            <Typography>No Result</Typography>
        }
      />
    );
  };

export default CTableExample;
