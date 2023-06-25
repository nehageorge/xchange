import "./Home.css";
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

function CourseSearch() {
  const search = (query) => {
    console.log(query);
  };

  return (
    <div className="CourseSearch">
      <XchangeTabbedHeader />

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
                headers={["Course Name", "University", "Terms Offered"]}
                colWidths={["33.3%", "33.3%", "33.3%"]}
                tableBody={tempTableBody}
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

const tempTableBody = [
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": { border: 0 },
    }}
  >
    <TableCell
      component="th"
      scope="row"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Data Structures and Algorithms
    </TableCell>
    <TableCell>National University of Singapore (NUS)</TableCell>
    <TableCell>
      <div>
        <p>Fall 2023</p>
        <p>Winter 2024</p>
      </div>
    </TableCell>
  </TableRow>,
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": { border: 0 },
    }}
  >
    <TableCell
      component="th"
      scope="row"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Data Structures and Algorithms
    </TableCell>
    <TableCell>National University of Singapore (NUS)</TableCell>
    <TableCell>
      <div>
        <p>Fall 2023</p>
        <p>Winter 2024</p>
      </div>
    </TableCell>
  </TableRow>,
  <TableRow
    sx={{
      "&:last-child td, &:last-child th": { border: 0 },
    }}
  >
    <TableCell
      component="th"
      scope="row"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      Data Structures and Algorithms
    </TableCell>
    <TableCell>National University of Singapore (NUS)</TableCell>
    <TableCell>
      <div>
        <p>Fall 2023</p>
        <p>Winter 2024</p>
      </div>
    </TableCell>
  </TableRow>,
];

export default CourseSearch;
