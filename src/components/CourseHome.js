import "./UniversitySearch.css";
import { View } from "react-native";
import React from "react";
import PagePreview from "./PagePreview";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import XchangeTabbedHeader from "./XchangeTabbedHeader";

function CourseHome() {
  return (
    <div className="CourseHome">
      <XchangeTabbedHeader uniActive={false} />
      <View>
        <img
          src={"/matt-ragland-02z1I7gv4ao-unsplash-cropped.jpg"}
          alt="Macbook, bagpack and notes"
          style={{ maxHeight: 400, paddingBottom: "0.5rem" }}
        ></img>
      </View>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <PagePreview
              imageURL="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              altText="Person Searching for a course on their laptop"
              page="/course/search"
              title="Search for a Course"
              description="Interested in courses students have taken at a particular university abroad? Want to check a previously approved UW course equivalent at another institute? Search for the course, university and your program here!"
            />
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CourseHome;
