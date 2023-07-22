
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, TextField, Stack, TableCell, TableRow } from "@mui/material";
import PreviouslyApprovedTable from "./PreviouslyApprovedTable";

function PreviouslyApprovedCourses({uniName}) {
    const [courseEquivalencies, setCoursesEquivalency] = useState([]);
    const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
    const [query, setQuery] = useState("");
useEffect(() => {
    fetch("/course_equivalencies/search", {headers: {'Content-Type': 'application/json'}, body: {"unis": [uniName] } }).then((res) =>
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

        fetch("/course_equivalencies/search", {headers: {'Content-Type': 'application/json'}, body: {"unis": [uniName] }, query: newQuery }).then((res) =>
            res.json().then((data) => {
            if (newQuery.length != 0) {
                setCoursesEquivalency(data);
            }
            })
        );
    };

    return(
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
          headers={["Course Name", "UW Course Equivalent", "Terms Taken", "Students Program"]}
          colWidths={["15%", "15%", "15%", "15%"]}
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
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  {ce.uwcourse.code}: {ce.uwcourse.name}
                </Text>
              </TableCell>
              <TableCell>
                <Text
                  component="th"
                  scope="row"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                    {/* Todo: ce.coursename needs to exist*/}
                  {ce.code}: {ce.uwcourse.name}
                </Text>
              </TableCell>
              <TableCell>{ce.university.terms}</TableCell>
              <TableCell>{ce.student_program}</TableCell>
            </TableRow>
          ))}
        /> 
        </>
    )
}

export default PreviouslyApprovedCourses;