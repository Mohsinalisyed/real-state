import styled from "styled-components";
import { TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

interface BoxProps {
  // Define Box props here if necessary
  css?: any;
}

const Box = styled.div<BoxProps>`
  /* Define Box styles here */
  ${({ css }) => css}
`;

export const Caption = styled.caption({
  textAlign: "start",
  marginBottom: "$5",
});

export const Tbody = styled.tbody({
  width: "100%",
  // '& tr:last-child td': {
  //   borderBottom: 'none !important',
  // },
});

export const Tfoot = styled.tfoot({
  // Define Tfoot styles here if necessary
});

export const Tr = styled.tr({
  border: "none",
});

export const Th = styled.th({
  border: "yellow solid 1px",
});

export const Td = styled.td({
  border: "red solid 1px",
});

export const Thead = styled.thead({
  [`& ${Th}`]: {
    fontSize: "$1",
    color: "$gray11",
  },
  [`& ${Td}`]: {
    fontSize: "$1",
    color: "$gray11",
  },
  border: "1px solid $gray4",
});

export const Table = styled.table<{ striped?: boolean }>((props) => ({
  width: "100%",
  tableLayout: "fixed",
  borderSpacing: 0,
  backgroundColor: "transparent",
  ...(props.striped && {
    "& tbody tr": {
      "&:nth-child(odd)": {
        bc: "$gray2",
      },
    },
  }),
}));

export interface TableProps {
  rows: { cells: { cell: () => JSX.Element }[]; onClick?: () => void }[];
  heads: { title: string; width?: string }[];
  thAlign?: "start" | "center" | "end";
  thBorder?: "none" | "dashed" | "solid" | "full";
  thWidth?: string;
  tdAlign?: "start" | "center" | "end";
  tdBorder?: "none" | "dashed" | "solid" | "full";
  tdPadding?: string;
  overflow?: boolean;
  fontsize?: number;
  isPadding?: boolean;
}

export const TableCustom: React.FC<TableProps> = ({
  rows,
  heads,
  thAlign,
  thBorder,
  thWidth,
  tdAlign,
  tdBorder,
  tdPadding,
  overflow,
  fontsize,
  isPadding,
}) => {
  const TableTopBoxStyled = {
    overflowX: overflow ? "hidden" : "auto",
    "&::-webkit-scrollbar": {
      width: 2,
      height: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "$white",
      borderRadius: 14,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "$gray4",
      borderRadius: 8,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "$gray5",
    },
  };

  const TrStyled = {
    "& > *": {
      padding: isPadding
        ? tdPadding === "res_xxs"
          ? "13px 22px"
          : "20px 22px"
        : 0,
    },
    [`& > ${Td}`]: {
      textAlign:
        tdAlign === "center" ? "center" : tdAlign === "end" ? "right" : "left",
      borderBottom: tdBorder === "none" ? "none" : "1px solid $gray4",
    },
  };

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            {heads.map((head, index) => (
              <Th key={index}>{head.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row, index) => (
            <Tr
              key={index}
              onClick={row.onClick}
              style={{ cursor: row.onClick ? "pointer" : "default" }}
            >
              {row.cells.map((cell, idx) => (
                <Td key={idx}>{cell.cell()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
