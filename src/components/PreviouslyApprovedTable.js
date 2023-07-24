import React from "react";
import XChangeButton from "./XChangeButton.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

function PreviouslyApprovedTable(props) {
    const search = (query) => {
        console.log(query);
    };
  return (
    <TableContainer
      sx={{ borderRadius: "15px", border: 2, borderColor: "#E0D03B" }}
    >
      <Table>
        <colgroup>
          {props.colWidths.map((width) => {
            return <col style={{ width }} />;
          })}
        </colgroup>
        <TableHead>
          <TableRow>
            {props.headers.map((header) => {
              return (
                <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{header}</TableCell>
              );
            })}
            <TableCell style={{ fontSize: "1.2rem", fontWeight: "bold" }}></TableCell>
            <TableCell>
            {XChangeButton("Show All Approved Courses", "/course/search", undefined, "#E4E3E3")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{props.tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default PreviouslyApprovedTable;