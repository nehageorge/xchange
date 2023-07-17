import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";

function XchangeCourseTable(props) {
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/course_equivalencies").then((res) =>
      res.json().then((data) => {
        setCoursesEquivalency(data);
        setAllCoursesEquivalency(data);
      })
    );
  }, []);

  const search = (newQuery) => {
    setQuery(newQuery);
    if (newQuery.length == 0) {
      setCoursesEquivalency(allCourseEquivalencies);
      return;
    }

    fetch("/search_courses/" + newQuery).then((res) =>
      res.json().then((data) => {
        if (newQuery.length != 0) {
          setCoursesEquivalency(data);
        }
      })
    );
  };
  return (
    <>
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
                <TextField
                    sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
                    onChange={(event) => {
                    search(event.target.value);
                    }}
                    name="search"
                    label="Search by university"
                    variant="outlined"
                    fullWidth
                    size="small"
                    InputLabelProps={{ style: { fontSize: 20 } }}
                />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{courseEquivalencies.map((ce) => {
                  if(ce.uwcourse.id === props.courseId && ce.university.id === props.uniId)
                  return(
                  <TableRow
                    key={ce.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      {ce.uwcourse.name}
                    </TableCell>
                    <TableCell>
                      {ce.uwcourse.code}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {ce.university.name}
                    </TableCell>
                  </TableRow>)
                })}</TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      count={courseEquivalencies.length}
    />
    </>
  );
}

export default XchangeCourseTable;