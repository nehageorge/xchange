import "./Home.css";
import { View } from "react-native";
import React from "react";
import PagePreview from "./PagePreview"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// TO-DO Remove when the reusable Table Component is made
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function PreviousCourseSequences() {

  return (
    <div className="PreviousCourseSequences">
      <View style={{ flex: 1, padding: 5 }}>
        <div className="TopBar">
          <h1 style={{ color: "gold" }}>X</h1>
          <h1>Change </h1>
        </div>
      </View>

      <View>
        <img src="https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78" alt="Macbook, bagpack and notes" style={{ maxHeight: 400, paddingBottom: '1em' }}></img>
      </View>

      <h2>Previously Accepted Course Sequences</h2>

      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold' }}>Engineering Department</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold' }}>Countries</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold' }}>Universities</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" style={{ color: "blue",  textDecoration: "underline" }}>
                      Software Engineering
                    </TableCell>
                    <TableCell align="right">UK</TableCell>
                    <TableCell align="right">University of Liverpool</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        
        </Grid>
        <Grid item xs={3}>
          
        </Grid>
      </Grid>
    </Box>

    </div>
  );
}

export default PreviousCourseSequences;
