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
          <Grid item xs={6}>
            <PagePreview
              imageURL="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
              altText="Planning to travel, Bag, field notes, camera and travel pamphlets laid out over a map"
              page="/course/prevSequence"
              title="Previously Accepted Course Sequences"
              description="Take a look at the previously accepted course plans students at the University of Waterloo have done when on exchange at foreign institutions (engineering only)."
            />
          </Grid>
          <Grid item xs={6}>
            <PagePreview
              imageURL="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              altText="Person Searching for a course on their laptop"
              page="/course/search"
              title="Search for a Course"
              description="Interested in courses students have taken at a particular university abroad? Want to check a previously approved UW course equivalent at another institute? Search for the course, university and your program here!"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CourseHome;
