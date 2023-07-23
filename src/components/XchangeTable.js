import { React, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import "./XchangeTable.css";

function XchangeTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  function handleChangePage(_event, newpage) {
    setPage(newpage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <>
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
          <TableBody>
            {props.tableBody.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25]}
        component="div"
        count={props.numRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ verticalAlign: "middle" }}
      />
    </>
  );
}

export default XchangeTable;
