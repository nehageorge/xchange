import "./CoursePage.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeCourseTable from "./XchangeCourseTable";

function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState({});
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetch("/course/" + params.id).then((res) =>
      res.json().then((data) => {
        setCourse(data);
      })
    );

    fetch("/course_equivalencies", {}).then((res) =>
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
      <View
        style={{
          flex: 1,
          padding: 20,
          marginLeft: "30px",
          marginRight: "50px",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "left" }}>
          {course["code"]} : {course["name"]}
        </Text>
        <hr
          style={{
            opacity: "100%",
            width: "25%",
            background: "#E0D03B",
            height: "3px",
            border: "none",
          }}
        />
        <Text>{course["description"]}</Text>
        <br></br>
        <XchangeCourseTable
          headers={["Previously Approved Courses"]}
          colWidths={["40%"]}
          course_id={params.id}
        />
      </View>
    </div>
  );
}

export default CoursePage;
