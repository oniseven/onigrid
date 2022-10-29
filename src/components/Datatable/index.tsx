import { useEffect } from "react";
import { Column, sortItf } from "../../onigrid/Types";
import { useOnigrid } from "../../onigrid/useOnigrid";

const Datatable = ({
  columnsDef,
  data,
  pageSize = 1,
  pageRows = 10,
}: Props) => {
  console.log("component datatable", pageSize);
  const { sorting, filter, pagging } = useOnigrid({
    columns: columnsDef,
    data,
    pageSize,
    pageRows,
  });

  console.log("component datatable", pagging);

  useEffect(() => {
    console.log("inside effect component datatable");
    // console.log("inside effect", sorting)
    // console.log("inside effect", filter)
    console.log("--- pagging", pagging);
  }, [sorting, filter, pagging]);

  return <div>Datatables</div>;
};

type Props = {
  columnsDef: Column[];
  data: any;
  pageSize?: number;
  pageRows?: number;
  defaultSort?: sortItf | undefined;
};

export default Datatable;
