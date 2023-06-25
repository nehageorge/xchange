import "./XchangeTabbedHeader.css";
import React from "react";
import { View } from "react-native";
import { useNavigate } from "react-router-dom";

function XchangeTabbedHeader() {
  const navigate = useNavigate();

  return (
    <div className="TabbedHeader">
      <div className="TopHeader">
        <h1 style={{ color: "#E0D03B" }}>X</h1>
        <h1>Change </h1>
        <div style={{ flex: 1 }}></div>
        <button className="LoginButton" variant="contained" onClick={() => navigate("/")}>
          <h4>Log in</h4>
        </button>
      </div>
      <View style={{ flex: 1, padding: 5 }}></View>
      <div className="Tabs">
        <button className="UniversitiesTab" onClick={() => navigate("/index")}>
          <h4>Universities</h4>
        </button>
        <button className="CoursesTab" onClick={() => navigate("/course/home")}>
          <h4>Courses</h4>
        </button>
      </div>
    </div>
  );
}

export default XchangeTabbedHeader;
