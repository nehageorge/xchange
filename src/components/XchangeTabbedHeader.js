import "./XchangeTabbedHeader.css";
import React from "react";
import { View } from "react-native";

function XchangeTabbedHeader() {
    return(
        <div className="TabbedHeader">
            <div className="TopHeader">
                <h1 style={{ color: "gold" }}>X</h1>
                <h1>Change </h1>
                <div style={{ flex: 1 }}></div>
                <button
                    className = "LoginButton"
                    variant="contained"
                >
                    <h4>Log in</h4>
                </button>
            </div>
            <View style={{ flex: 1, padding: 5 }}></View>
            <div className="Tabs">
                <button className="UniversitiesTab">
                    <h4>Universities</h4>
                </button>
                <button className="CoursesTab">
                <h4>Courses</h4>
                </button>
            </div>
        </div>
    );
}

export default XchangeTabbedHeader;