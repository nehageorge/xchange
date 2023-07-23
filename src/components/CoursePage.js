import "./CoursePage.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeCourseTable from "./XchangeCourseTable";

function CoursePage() {
  const [unis, setUnis] = useState([]);
  const [allUnis, setAllUnis] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/universities").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setAllUnis(data);
        if (search.length == 0) {
          setUnis(data);
        }
      })
    );
  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch);
    if (newSearch.length == 0) {
      setUnis(allUnis);
      return;
    }
    fetch("/search_unis/" + newSearch).then((res) =>
      res.json().then((data) => {
        if (newSearch.length != 0) {
          setUnis(data);
        }
      })
    );
  }

  return (
    <div>
      <XchangeTabbedHeader />
      <View>
        <img
          src="/singapore_skyline.png"
          alt="Panoramic view of Singapore city"
          style={{
            maxHeight: 340,
            objectFit: "cover",
          }}
        ></img>
      </View>
      <View style={{ flex: 1, padding: 20, marginLeft: "30px", marginRight: "50px" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "left" }}>
            Course Name
        </Text>
        <hr style={{opacity: "100%", width: "25%", background: "#E0D03B", height: "3px", border: "none"}}/>  
        <Text>Course Description : An introduction to concurrent and parallel programming, with an emphasis on language constructs. 
            Major topics include exceptions, coroutines, atomic operations, critical sections, mutual exclusion, semaphores, high-level 
            concurrency, deadlock, interprocess communication, process structuring, shared memor,y and distributed architectures.
             Students will learn how to structure, implement, and debug concurrent programs. [Note: Enrolment is restricted; see Note 1 above.
              Lab is not scheduled and students are expected to find time in open hours to complete their work. Offered: F,W]
        </Text>
        <br></br>
        <XchangeCourseTable
            headers={[
                "Previously Approved Course Sequences",
            ]}
            colWidths={["40%"]}
            tableBody={tempTableBody}
            // TO-DO Connect to the course endpoint
        />

      </View>
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
        Feedback Control Systems
      </TableCell>
      <TableCell>EE3331C</TableCell>
      <TableCell
       component="th"
       scope="row"
       style={{ color: "blue", textDecoration: "underline" }}
      >National University of Singapore (NUS)</TableCell>
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
        Feedback Control Systems
      </TableCell>
      <TableCell>EE3331C</TableCell>
      <TableCell
       component="th"
       scope="row"
       style={{ color: "blue", textDecoration: "underline" }}
      >Another National University of Singapore (aNUS)</TableCell>
    </TableRow>,
  ];
  

export default CoursePage;
