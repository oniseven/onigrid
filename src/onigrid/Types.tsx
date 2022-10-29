export interface Column {
  field: string;
  label: string;
  /** @defaultValue  true */
  search?: boolean;
  /** @defaultValue  true */
  sort?: boolean;
  className?: string;
  width?: string;
}

export type sortItf =
  | {
      field: string;
      /** @defaultValue true */
      asc: boolean;
    }
  | undefined;

export interface gridProp {
  columns: Column[];
  /** @defaultValue  {} */
  data: any[];
  /** @defaultValue  false */
  multiselect?: boolean;
  defaultSort?: sortItf | undefined;
  /** @defaultValue 10 */
  pageRows?: number;
  /** @defaultValue 1 */
  pageSize?: number;
}

export interface paggingItf {
  /** @defaultValue 0 */
  index: number;
  /** @defaultValue 10 */
  rows: number;
  /** @defaultValue 1 */
  size: number;
  /** @defaultValue false */
  canGoBack?: boolean;
  /** @defaultValue true */
  canGoForward?: boolean;
}

export interface filterItf {
  [key: string]: string | number;
}
