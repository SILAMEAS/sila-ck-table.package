import useStateManagementFormStore from '@/utils/all-step-four/share/useStateManagementFormStore';
import {EnumProjectStatusDownloadDocumentInterfaces} from '@components/ng-switch-case-status/interface';
import {EnumTableFooterType} from '@components/ng-table/TableCustom/type';
import {Dispatch, SetStateAction} from 'react';
import {ANY} from '@constant/style/SxConstant';

const useFilterRowHasDownloadOutTableCustom = <
  CO extends Record<string, ANY>,
>() => {
  const {allStatusDownloadDocuments} = useStateManagementFormStore();
  const filterRowHasDownloadWhenDownloadStatusNone = ({
    id,
    typeOfTable,
    setVisibleRows,
    refetch,
  }: {
    id: number;
    typeOfTable: EnumTableFooterType;
    setVisibleRows: Dispatch<SetStateAction<CO[]>>;
    refetch: ANY;
  }) => {
    const StatusDownloadNone = allStatusDownloadDocuments.find(
      status => status === EnumProjectStatusDownloadDocumentInterfaces.NONE,
    );
    if (StatusDownloadNone) {
      switch (typeOfTable) {
        case EnumTableFooterType.infiniteScroll: {
          setVisibleRows(pre => pre.filter(i => i.id !== id));
          break;
        }
        case EnumTableFooterType.pagination: {
          refetch();
          break;
        }
        default: {
          break;
        }
      }
    }
  };
  const filterRowHasDownloadWhenDownloadStatusNoneByFlowId = ({
    flowId,
    typeOfTable,
    setVisibleRows,
    refetch,
  }: {
    flowId: string;
    typeOfTable: EnumTableFooterType;
    setVisibleRows: Dispatch<SetStateAction<CO[]>>;
    refetch: ANY;
  }) => {
    const StatusDownloadNone = allStatusDownloadDocuments.find(
      status => status === EnumProjectStatusDownloadDocumentInterfaces.NONE,
    );
    if (StatusDownloadNone) {
      switch (typeOfTable) {
        case EnumTableFooterType.infiniteScroll: {
          setVisibleRows(pre => pre.filter(i => i.flowId !== flowId));
          break;
        }
        case EnumTableFooterType.pagination: {
          refetch();
          break;
        }
        default: {
          break;
        }
      }
    }
  };
  return {
    filterRowHasDownloadWhenDownloadStatusNone,
    filterRowHasDownloadWhenDownloadStatusNoneByFlowId,
  };
};

export default useFilterRowHasDownloadOutTableCustom;
