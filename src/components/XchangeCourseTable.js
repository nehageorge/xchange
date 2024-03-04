import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

function XchangeCourseTable(props) {
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/course_equivalencies/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course_id: props.course_id }),
    }).then((res) =>
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

    fetch(process.env.REACT_APP_PROXY + "/course_equivalencies/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uni_query: newQuery, course_id: props.course_id }),
    }).then((res) =>
      res.json().then((data) => {
        if (newQuery.length != 0) {
          setCoursesEquivalency(data);
        }
      })
    );
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
                <TableCell
                  colSpan={2}
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </TableCell>
              );
            })}
            <TableCell
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            ></TableCell>
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
        <TableBody>
          {courseEquivalencies.map((ce) => (
            <TableRow
              key={ce.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>
                <Text
                  component="th"
                  scope="row"
                  // style={{ color: "blue", textDecoration: "underline" }}
                >
                  {ce.uwcourse.name}
                </Text>
              </TableCell>
              <TableCell>{ce.uwcourse.code}</TableCell>
              <TableCell>{ce.code}</TableCell>
              <TableCell>{ce.university.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default XchangeCourseTable;
