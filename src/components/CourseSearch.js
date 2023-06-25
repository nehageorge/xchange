import "./Home.css";
import { View } from "react-native";
import React from "react";
import PagePreview from "./PagePreview"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, TextField } from "@mui/material";
import XchangeTable from "./XchangeTable";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import XchangeTabbedHeader from "./XchangeTabbedHeader"


function CourseSearch() {

  const search = (query) =>{
    console.log(query)
  }

  return (
    <div className="CourseSearch">
      <XchangeTabbedHeader/>


      <View>
        <img src={'/matt-ragland-02z1I7gv4ao-unsplash-cropped.jpg'} alt="Macbook, bagpack and notes" style={{ maxHeight: 400, paddingBottom: '1rem' }}></img>
      </View>
      <div style={{padding: '1em', marginLeft: '1rem'}}>
        <h2>Search for a Course</h2>
        

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                onChange={(event) => {
                  search(event.target.value);
                }}
                name="search"
                label="Search"
                variant="standard"
                style={{ marginBottom: "1.5rem"}}
                fullWidth
              />

              <XchangeTable
                headers={["Course Name", "University", "Terms Offered"]}
                colWidths={["33.3%", "33.3%", "33.3%"]}
                tableBody = {tempTableBody}
                // TO-DO Connect to the course endpoint 
              />
            </Grid>
            <Grid item xs={3}>
              {/* TO-DO add the Course Filter Component */}
              {/* <div>
                <h3> Program</h3>
                <h3> University</h3>
              </div> */}
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
    
  </TableRow>
]

export default CourseSearch;
