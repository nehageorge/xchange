import "./Home.css";
import { View } from "react-native";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import XchangeTable from "./XchangeTable";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ProgramButton from "./ProgramButton";

function PreviousCourseSequences() {
  const programs = [
    "Software Engineering",
    "Managment Engineering",
    "Mechanical Engineering",
    "Computer Science",
    "Civil Engineering",
    "Biomedical Engineering",
    "Environmental Engineering",
    "Architectural Engineering",
  ];

  return (
    <div className="PreviousCourseSequences">
      <XchangeTabbedHeader uniActive={false}/>
      <View>
        <img
          src={"/matt-ragland-02z1I7gv4ao-unsplash-cropped.jpg"}
          alt="Macbook, bagpack and notes"
          style={{ maxHeight: 400, paddingBottom: "1rem" }}
        ></img>
      </View>

      <div style={{ padding: "1rem", marginLeft: "1rem" }}>
        <h2>Previously Accepted Course Sequences</h2>
        <div style={{ paddingTop: "1rem" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <XchangeTable
                  headers={[
                    "Engineering Department",
                    "Countries",
                    "University",
                  ]}
                  colWidths={["33.3%", "33.3%", "33.3%"]}
                  tableBody={[
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <div>
                          <p>Software Engineering</p>
                          <p>
                            Note 1: must have minimum overall GPA of 80% Note 2:
                            3B term only
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p>Denmark</p>
                        <p>Italy</p>
                        <p>Germany</p>
                      </TableCell>
                      <TableCell
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        <div>
                          <p>University of Southern Denmark (SDU)</p>
                          <p>Politecnico di Milano (PoliMi)</p>
                          <p>Istanbul Technical University (ITU)</p>
                        </div>
                      </TableCell>
                    </TableRow>,
                  ]}
                />
              </Grid>
              <Grid item xs={3} sx={{ padding: "2rem" }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    borderRadius: "15px",
                    border: 1,
                    borderColor: "gray",
                  }}
                >
                  {programs.map((program) => (
                    <ProgramButton text={program} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PreviousCourseSequences;
