import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Box, TextField, Stack, TableCell, TableRow } from "@mui/material";
import PreviouslyApprovedTable from "./PreviouslyApprovedTable";

function PreviouslyApprovedCourses() {
  const params = useParams();
  const curUrl = `/get_uni/${params.id}`;
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [currUni, setCurrUni] = useState({});
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + curUrl).then((res) =>
      res.json().then((data) => {
        setCurrUni(data);
      })
    );
  }, []);
  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/course_equivalencies/" + params.id).then((res) =>
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
      body:  JSON.stringify({ unis: [currUni["name"]], query: newQuery }),

    }).then((res) =>
      res.json().then((data) => {
        if (newQuery.length != 0) {
          setCoursesEquivalency(data);
        }
      })
    );
  };

  return (
    <>
      <TextField
        sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
        onChange={(event) => {
          search(event.target.value);
        }}
        name="search"
        label="Search for previously approved courses"
        variant="outlined"
        InputLabelProps={{ style: { fontSize: 20 } }}
      />
      <br></br>
      <PreviouslyApprovedTable
        headers={[
          "Course Name",
          "UW Course Equivalent",
          "Term Taken",
          "Student's Program",
        ]}
        colWidths={["30%", "30%", "20%", "20%"]}
        tableBody={courseEquivalencies.map((ce) => (
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
              >
                {ce.uwcourse.code}: {ce.uwcourse.name}
              </Text>
            </TableCell>
            <TableCell>
              <Text>{ce.uwcourse_id}</Text>
              <Link to={`/uwcourse/${ce.uwcourse.id}` }>
                {ce.code}: {ce.uwcourse.name}
              </Link>
            </TableCell>
            <TableCell>{ce.university.terms}</TableCell>
            <TableCell>{ce.student_program}</TableCell>
          </TableRow>
        ))}
      />
    </>
  );
}

export default PreviouslyApprovedCourses;
