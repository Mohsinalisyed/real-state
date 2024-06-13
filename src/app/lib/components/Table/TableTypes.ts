export interface TableRowCellType {
  cells: { cell: () => React.ReactElement }[];
  onClick?: () => void;
}
export interface ICellType {
  cell: () => React.ReactElement;
}

export interface TableProps {
  heads: {
    id: number;
    title: JSX.Element | string;
    width?: string;
    isTitleReplace?: boolean;
  }[];
  rows: TableRowCellType[];
  thAlign?: "start" | "center" | "end" | undefined;
  thBorder?: "dashed" | "solid" | "none" | "full" | undefined;
  thWidth?:
    | 0
    | 1
    | 2
    | 4
    | 5
    | 7
    | "0"
    | "1"
    | "2"
    | "4"
    | "5"
    | "7"
    | undefined;
  tdWidth?: 1 | 2 | 4 | 5 | 7 | "1" | "2" | "4" | "5" | "7" | undefined;
  tdAlign?: "start" | "center" | "end" | undefined;
  tdBorder?: "dashed" | "solid" | "none" | "full" | undefined;
  tdPadding?:
    | "xxss"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "res_xxs"
    | "product_xxs"
    | undefined;
  overflow?: boolean;
  fontsize?: string;
  isPadding?: boolean;
}
