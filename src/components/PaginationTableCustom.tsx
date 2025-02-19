import { SelectChangeEvent, Stack } from "@mui/material";
import { ITableCustom } from "./types";
import { TablePaginateReBuild } from "./TablePaginateReBuild";
import { SelectDropDownPage } from "./SelectDropDownPage";
import EnumTableFooterType from "../constant/enum/EnumTableFooterType";

type typePick =
  | 'tableFooterType'
  | 'paginationCollapse'
  | 'filter'
  | 'currentData'
  | 'setFilter';
interface IPaginationTableCustom<P, T>
  extends Pick<ITableCustom<P, T>, typePick> {}
export default function PaginationTableCustom<
  P extends Record<string, any>,
  T extends Record<string, any>,
>({
  paginationCollapse,
  tableFooterType,
  filter,
  currentData,
  setFilter,
}: Readonly<IPaginationTableCustom<P, T>>) {

  const handleSelectPage = (event: SelectChangeEvent<any>) => {
    const newPageSize = Number(event.target.value);
    if (newPageSize !== filter.pageSize) {
      setFilter({
        ...filter,
        page: 1,
        pageSize: newPageSize,
      });
    }
  };
  const handleChangePage = (_event: unknown, newPage: number) => {
    setFilter({...filter, page: newPage});
  };
  return (
    <>
      {tableFooterType === EnumTableFooterType.pagination &&
        currentData?.total > 0 && (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width="100%" // Ensure full-width responsiveness
            py={"10px"}
            position={paginationCollapse ? 'sticky' : 'relative'} // Sticky pagination when collapsed
            bottom={0}
            bgcolor="white" // Keep background color to avoid overlap issues
            zIndex={1000} // Ensures it stays on top if needed
          >
            {/* Select dropdown for rows per page */}
            <SelectDropDownPage
              value={filter.pageSize.toString()}
              selectProps={{size: "small"}}
              typographyProps={{
                sx: {
                  fontSize: "14px",
                },
              }}
              items={currentData?.total ?? 0}
              handleChange={handleSelectPage}
              rowPerPagesOption={[10, 25, 50, 100]}
            />

            {/* Spacer for alignment */}
            <Stack flexGrow={1}></Stack>

            {/* Pagination Component */}
            <Stack>
              <TablePaginateReBuild
                handleChangePage={handleChangePage}
                totalPage={currentData?.totalPages ?? 0}
                page={filter.page}
              />
            </Stack>
          </Stack>
        )}
    </>
  );
}
