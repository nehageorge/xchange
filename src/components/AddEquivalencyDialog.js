import { Autocomplete, Dialog, Grid, TextField } from "@mui/material";
import React from "react";
import XChangeButton from "./XChangeButton";
import { Button } from "@mui/material";
import { Text } from "react-native-web";

function AddEquivalencyDialog(props) {
  const user = window.sessionStorage.getItem("user");
  const userPresent = user ? true : false;
  // placeholder data
  const uwCourseNames = [
    { label: "Concurrent and Parallel Programming", code: "CS 343" },
    { label: "Classical Mechanics", code: "ECE105" },
    { label: "Electricity and Magnetism", code: "ECE106" },
    { label: "Algebra for Honours Mathematics", code: "MATH 135" },
  ];
  const uwPrograms = [
    { label: "Software Engineering" },
    { label: "Biomedical Engineering" },
    { label: "Civil Engineering" },
    { label: "Management Engineering" },
    { label: "Mechanical Engineering" },
    { label: "Computer Science" },
  ];
  const pastTenYears = [
    { label: "2023" },
    { label: "2022" },
    { label: "2021" },
    { label: "2020" },
    { label: "2019" },
  ];
  const hostUnis = [
    { label: "National University of Singapore" },
    { label: "Bilkent University" },
    { label: "Deakin University" },
    { label: "Ewha Womans University" },
    { label: "Griffith University" },
    { label: "University of Leeds" },
  ];

  function DropdownMenu(menuLabel, menuOptions, menuName) {
    return (
      <Autocomplete
        options={menuOptions}
        renderInput={(params) => (
          <TextField {...params} label={menuLabel} name={menuName} />
        )}
      />
    );
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={userPresent}
      maxWidth="md"
      PaperProps={{ style: { padding: 20 } }}
    >
      {userPresent && (
        <form action="/course/search" method="POST">
          <div className="DialogContent">
            <h3>Add Your Course Equivalency</h3>
            <div
              style={{ height: 3, width: 400, backgroundColor: "#e0d03b" }}
            ></div>
            <Grid container spacing={2} direction="row" padding={3}>
              <Grid item xs={4}>
                <p>UW Course Name</p>
                {DropdownMenu("", uwCourseNames, "uw_course_name")}
              </Grid>
              <Grid item xs={4}>
                <p>Your Program</p>
                {DropdownMenu("", uwPrograms, "program")}
              </Grid>
              <Grid item xs={4}>
                <p>Year Taken</p>
                {DropdownMenu("", pastTenYears, "year_taken")}
              </Grid>
              <Grid item xs={4}>
                <p>Host University</p>
                {DropdownMenu("", hostUnis, "host_uni")}
              </Grid>
              <Grid item xs={4}>
                <p>Host Course Name</p>
                <TextField
                  name="host_course_name"
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={4}>
                <p>Host University Course Code</p>
                <TextField
                  name="host_course_code"
                  sx={{ width: "100%" }}
                ></TextField>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={3}>
                <div onClick={props.onClose}>{XChangeButton("Cancel")}</div>
              </Grid>
              <Grid item xs={3}>
                <div onClick={props.saveOnClick}>
                  <Button
                    sx={{ backgroundColor: "#E0D03B" }}
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    <div class="button-text">
                      <Text style={{ fontStyle: "italic" }}>Save</Text>
                    </div>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      )}
      {!userPresent && (
        <div className="UnloggedDialogContent">
          <h3>You must be logged in first!</h3>
        </div>
      )}
    </Dialog>
  );
}

export default AddEquivalencyDialog;
