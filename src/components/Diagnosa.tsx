import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Column, paggingItf, sortItf } from "../onigrid/Types";
// import Datatable from "./components/Datatable";
import Datatable from "./Datatable";

const Diagnosa = () => {
  const [sorting, setSorting] = useState<sortItf>({
    field: "code",
    asc: true,
  });
  const [filter, setFilter] = useState(null);
  // const { pagging, setPagging } = usePagging();
  const [pagging, setPagging] = useState<paggingItf>({
    index: 0,
    rows: 40,
    size: 1
  });

  const columns: Column[] = useMemo(
    () => [
      {
        field: "code",
        label: "Kode",
        className: "text-center",
        width: "100px",
      },
      {
        field: "name",
        label: "Nama",
      },
    ],
    []
  );

  const { data: response, isLoading } = useQuery(
    ["datatable", pagging, filter, sorting],
    async ({ signal }) => {
      return fetch("http://localhost/finance/diagnosa", {
        signal,
        method: "POST",
        body: JSON.stringify({
          sorting,
          filter,
          pageIndex: pagging.index,
          pageRows: pagging.rows,
        }),
      }).then((response) => response.json());
    }
  );

  if (isLoading) console.log("isLoading");
  const pageSize = (isLoading) ? 1 : response.totalPage;
  return (
    <>
      {isLoading && <>Loading...</>}
      <Datatable
        columnsDef={columns}
        data={response?.data}
        // setState={{
        //   sorting: setSorting,
        //   filter: setFilter,
        //   pagging: setPagging,
        // }}
        pageSize={pageSize}
        pageRows={pagging.rows}
        defaultSort={sorting}
      />
    </>
  );
};

export default Diagnosa;
