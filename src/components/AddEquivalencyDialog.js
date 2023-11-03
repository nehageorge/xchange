import { Autocomplete, Dialog, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import XChangeButton from "./XChangeButton";
import { Button } from "@mui/material";
import { Text } from "react-native-web";

function AddEquivalencyDialog(props) {
  const [uwCourseId, setUwCourseId] = useState(0);
  const [hostUniId, setHostUniId] = useState(0);
  const [uwCourses, setUwCourses] = useState([]);
  const [hostUnis, setHostUnis] = useState([]);

  const user = window.sessionStorage.getItem("user");
  const userPresent = user ? true : false;
  // placeholder data
  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/universities").then((res) =>
      res.json().then((data) => {
        setHostUnis(data.map(getHostUniData));
      })
    );
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/uw_courses").then((res) =>
      res.json().then((data) => {
        setUwCourses(data.map(getUWCourseData));
      })
    );
  }, []);

  function getHostUniData(item) {
    return { label: item.name, id: item.id };
  }

  function getUWCourseData(item) {
    return { label: `${item.code}: ${item.name}`, id: item.id };
  }

  const uwPrograms = [
    { label: "Architectural Engineering" },
    { label: "Architecture" },
    { label: "Biomedical Engineering" },
    { label: "Chemical Engineering" },
    { label: "Civil Engineering" },
    { label: "Computer Engineering" },
    { label: "Electrical Engineering" },
    { label: "Environmental Engineering" },
    { label: "Geological Engineering" },
    { label: "Management Engineering" },
    { label: "Mechanical Engineering" },
    { label: "Mechatronics Engineering" },
    { label: "Nanotechnology Engineering" },
    { label: "Software Engineering" },
    { label: "Systems Design Engineering" },
  ];
  const pastTenYears = [
    { label: "2023" },
    { label: "2022" },
    { label: "2021" },
    { label: "2020" },
    { label: "2019" },
    { label: "2018" },
    { label: "2017" },
    { label: "2016" },
    { label: "2015" },
  ];

  function DropdownMenu(menuLabel, menuOptions, menuName, onChange) {
    return (
      <Autocomplete
        options={menuOptions}
        onChange={onChange}
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
                {DropdownMenu("", uwCourses, "uw_course_name", (_, value) => {
                  setUwCourseId(value.id);
                })}
                <input
                  type="hidden"
                  name="uw_course_id"
                  value={uwCourseId}
                ></input>
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
                {DropdownMenu("", hostUnis, "host_uni", (_, value) =>
                  setHostUniId(value.id)
                )}
                <input
                  type="hidden"
                  name="host_uni_id"
                  value={hostUniId}
                ></input>
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
