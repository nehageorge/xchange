import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function XchangeTable(props) {
  return (
    <TableContainer
      sx={props.outline? { borderRadius: "15px", border: 1, borderColor: "gray" } : { border: 0}}
    >
      <Table>
        <colgroup>
          {props.colWidths.map((width) => {
            return <col style={{ width }} />;
          })}
        </colgroup>
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(224, 208, 59, 0.5)" }}>
            {props.headers.map((header) => {
              return (
                <TableCell style={{ fontSize: "1.2rem" }}>{header}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>{props.tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default XchangeTable;