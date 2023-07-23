import "./XchangeTabbedHeader.css";
import XchangeTopBar from "./XchangeTopBar";
import { View } from "react-native";
import { AppBar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function XchangeTabbedHeader({ uniActive = true }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      style={{ background: "white", paddingTop: 10, color: "black" }}
    >
      <div className="TabbedHeader">
        <XchangeTopBar />
        <View style={{ flex: 1 }}></View>
        <div className="Tabs">
          <button
            className="UniversitiesTab"
            onClick={() => navigate("/universities")}
            style={{ background: uniActive ? "#fff" : "#ccc" }}
          >
            <h5>Universities</h5>
          </button>
          <button
            className="CoursesTab"
            onClick={() => navigate("/course/home")}
            style={{ background: uniActive ? "#ccc" : "#fff" }}
          >
            <h5>Courses</h5>
          </button>
        </div>
      </div>
    </AppBar>
  );
}

export default XchangeTabbedHeader;
