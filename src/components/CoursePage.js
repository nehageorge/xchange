import "./CoursePage.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeCourseTable from "./XchangeCourseTable";

function CoursePage() {
  const location = useLocation()
  const { title, description, uni_name } = location.state
  const params = useParams();
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/course_equivalencies/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unis: [uni_name] }),
    }).then((res) =>
      res.json().then((data) => {
        setCoursesEquivalency(data);
        setAllCoursesEquivalency(data);
      })
    );
  }, []);

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
            {title}
        </Text>
        <hr style={{opacity: "100%", width: "25%", background: "#E0D03B", height: "3px", border: "none"}}/>  
        <Text>{description}
        </Text>
        <br></br>
        <XchangeCourseTable
            uniName={uni_name}
            headers={[
                "Previously Approved Course Sequences",
            ]}
            colWidths={["40%"]}
            // tableBody={courseEquivalencies.map((ce) => (
            //   <TableRow
            //     key={ce.id}
            //     sx={{
            //       "&:last-child td, &:last-child th": { border: 0 },
            //     }}
            //   >
            //     <TableCell>
            //       <Text
            //         component="th"
            //         scope="row"
            //         style={{ color: "blue", textDecoration: "underline" }}
            //       >
            //         {ce.uwcourse.name}
            //       </Text>
            //     </TableCell>
            //     <TableCell>{ce.uwcourse.code}</TableCell>
            //     <TableCell>{uni_name}</TableCell>
            //   </TableRow>
            // ))}
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
