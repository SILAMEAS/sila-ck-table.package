
import {Skeleton, Stack, TableCell, TableRow, Typography} from '@mui/material';

import React from 'react';

export const SkeletonLoadingTableCustom = ({
  isFetching,
  isLoading,
  emptyData,
}: {
  isFetching: boolean;
  isLoading: boolean;
  emptyData?: React.ReactNode;
}) => {
  if (isFetching || isLoading) {
    return (
      <Stack p={2} height={"290px"} width={"100vw"}>
        {Array.from({length: 8}, (_, index: number) => (
          <Skeleton
            key={index}
            variant={"rectangular"}
            sx={{
              borderRadius:"3px",
              mb: 0.5,
            }}
            animation="pulse"
            width={"auto"}
            height={"35px"}
          />
        ))}
      </Stack>
    );
  } else {
    return (
      <TableRow sx={{height:"300px"}}>
        <TableCell sx={{border: "none", textAlign: "center"}} colSpan={7}>
          {emptyData ?? (
            <Typography>no-result</Typography>
          )}
        </TableCell>
      </TableRow>
    );
  }
};
