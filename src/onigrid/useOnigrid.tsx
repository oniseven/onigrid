import { useState } from "react";
import { Column, filterItf, gridProp, paggingItf, sortItf } from "./Types";

export const setColumns = (columns: Column[]): Column[] => {
  columns.map((column) => {
    if (column.search === undefined) column.search = true;
    if (column.sort === undefined) column.sort = true;
    return column;
  });

  return columns;
};

const canGoToStatus = (
  toBack: boolean = true,
  pageIndex: number,
  pageSize: number = 1
): boolean => {
  if (toBack) return pageIndex === 0 ? false : true;

  return pageIndex === pageSize - 1 ? false : true;
};

export const useOnigrid = ({
  columns,
  data,
  multiselect = true,
  defaultSort = undefined,
  pageRows = 10,
  pageSize = 1,
}: gridProp) => {
  const [filter, setFilter] = useState<filterItf | null>(null);
  const [sorting, setSorting] = useState<sortItf>(defaultSort);
  console.log("useOnigrid top", pageSize);
  const [pagging, setPagging] = useState<paggingItf>({
    index: 0,
    rows: pageRows,
    size: pageSize,
    canGoBack: false,
    canGoForward: pageSize > 1 ? true : false,
  });

  const [selectedRowIds, setSelectedRowIds] = useState<{
    [key: string | number]: Boolean;
  }>({});
  const [selectedRowDatas, setSelectedRowDatas] = useState<Array<any> | null>(
    null
  );

  const searchAbleColumns = columns.filter(
    (column) => column.search || column.search === undefined
  );

  const sortAbleColumns = columns.filter(
    (column) => column.sort || column.sort === undefined
  );

  return {
    filter,
    sorting,
    pagging,
    selectedRowIds,
    selectedRowDatas,
    searchAll: (keyword: string) => {
      let search: filterItf = {};
      if (keyword) {
        searchAbleColumns.forEach((column) => {
          search[column.field] = keyword;
        });
      }
      setPagging((prev) => ({ ...prev, index: 0 }));
      setFilter(search);
    },
    searchBy: (field: string, keyword: string) => {
      const isSearchAbleColumn = searchAbleColumns.find(
        (column) => column.field === field
      );

      setPagging((prev) => ({ ...prev, index: 0 }));
      setFilter((prev) => {
        if (prev === null) return { [field]: keyword };
        let prevFilter = prev;
        if (keyword === "" || !isSearchAbleColumn) delete prevFilter[field];
        if (keyword !== "" && isSearchAbleColumn) prevFilter[field] = keyword;

        return prevFilter;
      });
    },
    sortBy: (field: string) => {
      const isSortAbleColumn = sortAbleColumns.find(
        (column) => column.field === field
      );

      setSorting((prev) => {
        if (!isSortAbleColumn) return undefined;
        if (prev === undefined) return { field, asc: true };

        const asc = prev.field === field ? !prev.asc : true;
        return { field, asc };
      });
    },
    selectAll: (status: Boolean) => {
      let idsSelected: any = {};
      if (status) {
        data?.map((item) => {
          idsSelected[item.id] = true;
        });

        setSelectedRowIds(idsSelected);
        setSelectedRowDatas(data);
      } else {
        setSelectedRowIds({});
        setSelectedRowDatas([]);
      }
    },
    selectRow: (rowId: number, status: Boolean) => {
      const rowData = data.filter((item) => item.id === rowId);
      if (status) {
        setSelectedRowIds((prev) => ({ ...prev, [rowId]: true }));
        setSelectedRowDatas((prev) => {
          if (prev === null) return rowData;

          const idxDataExist = prev.findIndex((item) => item.id === rowId);
          if (idxDataExist === -1) return [...prev, ...rowData];

          return prev;
        });
      } else {
        setSelectedRowIds((prev) => {
          delete prev[rowId];
          return prev;
        });
        setSelectedRowDatas((prev) => {
          if (prev === null) return null;
          return prev.filter((item) => item.id !== rowId);
        });
      }
    },
    goToPage: (page: number) => {
      let toPageIndex = page - 1;
      if (toPageIndex > pagging.size) toPageIndex = pagging.size;
      if (toPageIndex < 0) toPageIndex = 0;

      setPagging((prev) => ({
        ...prev,
        index: toPageIndex,
        canGoBack: canGoToStatus(true, toPageIndex),
        canGoForward: canGoToStatus(false, toPageIndex, pagging.size),
      }));
    },
    nextPage: () => {
      let toPageIndex =
        pagging.index >= pagging.size - 1
          ? pagging.size - 1
          : pagging.index + 1;
      setPagging((prev) => ({
        ...prev,
        index: toPageIndex,
        canGoBack: canGoToStatus(true, toPageIndex),
        canGoForward: canGoToStatus(false, toPageIndex, pagging.size),
      }));
    },
    prevPage: () => {
      let toPageIndex = pagging.index <= 0 ? 0 : pagging.index - 1;
      setPagging((prev) => ({
        ...prev,
        index: toPageIndex,
        canGoBack: canGoToStatus(true, toPageIndex),
        canGoForward: canGoToStatus(false, toPageIndex, pagging.size),
      }));
    },
  };
};
