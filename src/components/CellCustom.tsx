import {Divider, TableCell, TableRow} from '@mui/material';
import { HeadCellCustom, ICellCustom } from './types';
import uniqueArray from '../utils/uniqueArray';

export default function CellCustom<R extends Record<string, any>>(
  props: Readonly<ICellCustom<R>>,
) {
  const {visibleRows, handleViewDetailPage, headCells, selected} = props;
  const topEvents = ['action', 'typeDownloadDoc'];
  return (
    <>
      {visibleRows?.map(row => {
        return (
          <TableRow
            hover
            onClick={() => {
              handleViewDetailPage && handleViewDetailPage(row);
            }}
            tabIndex={-1}
            key={row.id}
            sx={{
              '&.MuiTableRow-root': {
                height: 'auto',
                '&:hover': {
                  /** when we hover on row will color main Color for them and opacity 10 **/
                  backgroundColor:  'white',
                  color: ' #fff !important',
                },
              },
              cursor: 'pointer',
            }}>
            {uniqueArray<HeadCellCustom<R>>(headCells, 'id')?.map(item => {
              const {tableBodyCellProps = {}} = item;
              return (
                <TableCell
                  component="th"
                  scope="row"
                  padding="none"
                  key={item.id as string}
                  {...item.tableCellProps}
                  {...tableBodyCellProps}
                  onClick={e => {
                    if (
                      topEvents.includes(item.id as string) ||
                      item.stopPropagation
                    ) {
                      e.stopPropagation();
                    }
                  }}
                  sx={[
                    {
                      display: item.hidden ? 'none' : 'visible',
                      position: item.id === 'action' ? 'sticky' : 'inherit',
                      paddingTop: item.noPaddingRow ? 0 : "20px",
                      paddingBottom: item.noPaddingRow ? 0 : "20px",
                      right: -1,
                      zIndex: 1,
                      px: item.id === 'action' ? '20px' : 'inherit',
                      bgcolor: selected.includes(row.id)
                        ? `#D6056A10`
                        :"white",
                      borderBottom: row?.showExtendsRow ? 'none' : '',
                    },
                    ...(Array.isArray(tableBodyCellProps.sx)
                      ? tableBodyCellProps.sx
                      : [tableBodyCellProps.sx]),
                  ]}>
                  {item?.render?.(row)}
                </TableCell>
              );
            })}
            {/**
             we need to initialize col name : showExtendsRow to handle this toggle for data in visibleRows
             example : CO extends IDataRowCampaign & {showExtendsRow: boolean}
             export < toggleCollageRow> from useTableCustom
             {
             id: 'showExtendsRow',
             disableSort: false,
             label: '',
             tableCellProps: {
             align: left,
             padding: none,
             },
             tableSortLabelProps: {},
             stopPropagation: true,
             render: row => (
             <Button onClick={() => toggleCollageRow(row.id)}>JJJ</Button>
             ),
             extendsRow: row => <>Test</>,
             }
             **/}
            {row?.showExtendsRow && (
              <TableCell
                sx={{border: 'none', textAlign: 'center', p: 0}}
                colSpan={7}>
                {headCells
                  .filter(item => !item.hidden) // filter out all the cells that have hide=true
                  .map(item => item?.extendsRow?.(row))}
                <Divider />
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </>
  );
}
