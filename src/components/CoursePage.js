import "./CoursePage.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@mui/material";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeCourseTable from "./XchangeCourseTable";

function CoursePage({uniId, courseId}) {
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
            uniID={uniId}
            courseID={courseId}
            // TO-DO Connect to the course endpoint
        />

      </View>
    </div>
  );
}

export default CoursePage;
