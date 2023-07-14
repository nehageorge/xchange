import "./UniversitySearch.css";
import { View } from "react-native";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import XchangeTable from "./XchangeTable";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import CoursePageFilters from "./CoursePageFilters";
import { useState, useEffect } from "react";

function CourseSearch() {
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    fetch("/uw/courses").then((res) =>
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
    <div className="CourseSearch">
      <XchangeTabbedHeader uniActive={false} />
      <View>
        <img
          src={"/matt-ragland-02z1I7gv4ao-unsplash-cropped.jpg"}
          alt="Macbook, bagpack and notes"
          style={{ maxHeight: 400, paddingBottom: "1rem" }}
        ></img>
      </View>
      <div style={{ padding: "1em", marginLeft: "1rem" }}>
        <h2>Search for a Course</h2>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
                onChange={(event) => {
                  search(event.target.value);
                }}
                name="search"
                label="Search for courses"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { fontSize: 20 } }}
              />
              <br></br>
              <br></br>

              <XchangeTable
                headers={[
                  "UW Course Name",
                  "Host School Course Name",
                  "University",
                  "Terms Offered",
                ]}
                colWidths={["25%", "30%", "25%", "20%"]}
                tableBody={courseEquivalencies.map((uwCourse) => {
                  const course_rows = []
                  console.log(uwCourse.foreign_courses);
                  uwCourse.foreign_courses.map((course) => {
                    course_rows.push(
                      <TableRow
                        key={course.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          {uwCourse.code}: {uwCourse.name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          {course.code}: {course.name}
                        </TableCell>
                        <TableCell>
                          {course.university_id}
                        </TableCell>
                        <TableCell>
                          <div>
                            {course.terms}
                            {/* <p>Fall 2023</p>
                            <p>Winter 2024</p> */}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  });
                  return course_rows;
                })}
              // TO-DO Connect to the course endpoint
              />
            </Grid>
            <Grid item xs={3}>
              <CoursePageFilters />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default CourseSearch;
