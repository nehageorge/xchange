import "./Home.css";
import { View } from "react-native";
import React from "react";
import PagePreview from "./PagePreview"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, TextField } from "@mui/material";
import XchangeTable from "./XchangeTable";

// TO-DO Remove when the reusable Table Component is made
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function CourseSearch() {

  const search = (query) =>{
    console.log(query)
  }

  return (
    <div className="CourseSearch">
      <View style={{ flex: 1, padding: 5 }}>
        <div className="TopBar">
          <h1 style={{ color: "gold" }}>X</h1>
          <h1>Change </h1>
        </div>
      </View>

      <View>
        <img src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78" alt="Macbook, bagpack and notes" style={{ maxHeight: 400, paddingBottom: '1em' }}></img>
      </View>
      <div style={{padding: '1em'}}>
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
              style={{ margin: "1rem"}}
              fullWidth
            />
              <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{fontWeight: 'bold' }}>Course Name</TableCell>
                        <TableCell align="right" style={{fontWeight: 'bold' }}>School</TableCell>
                        <TableCell align="right" style={{fontWeight: 'bold' }}>Terms Offered</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" style={{ color: "blue",  textDecoration: "underline" }}>
                            Data Structures and Algorithms
                          </TableCell>
                          <TableCell align="right">National University of Singapore (NUS)</TableCell>
                          <TableCell align="right"><div>
                            <p>Fall 2023</p>
                            <p>Winter 2024</p>
                            </div>
                          </TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
              </TableContainer>

              <XchangeTable
                headers={["Course Name", "University", "Terms Offered"]}
                colWidths={["33.3%", "33.3%", "33.3%"]}
                tableBody={[
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
                      Andrea
                    </TableCell>
                    <TableCell>English</TableCell>
                    <TableCell>
                      <div>
                        <p>Fall 2023</p>
                        <p>Winter 2024</p>
                      </div>
                    </TableCell>
                    
                  </TableRow>
                ]}
              />
              
            
            </Grid>
            <Grid item xs={3}>
              <div>
                <h3> Program</h3>
                <h3> University</h3>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
      

    </div>
  );
}

export default CourseSearch;
