import "./AddAReview.css";
import XChangeButton from "./XChangeButton.js";
import CustomRating from "./CustomRating.js";

import * as React from "react";
import { Button, TextField, Select, MenuItem, Grid } from "@mui/material";

function textBox(txt, name = "") {
  return (
    <TextField
      id="outlined-basic"
      label={txt}
      name={name}
      variant="outlined"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4pt",
        width: "90%",
      }}
    ></TextField>
  );
}

function Slct(name, options = []) {
  const [slct, setSlct] = React.useState("");

  const handleChange = (event) => {
    setSlct(event.target.value);
  };

  return (
    <Select
      value={slct}
      name={name}
      onChange={handleChange}
      style={{ width: "100%", backgroundColor: "#ffffff" }}
      MenuProps={{ style: { maxHeight: 250 } }}
    >
      {options.map((option) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  );
}

function AddAReview(props) {
  const user = window.sessionStorage.getItem("user");
  const userPresent = user ? true : false;
  const url = userPresent ? `/get_uni/discussion/${props.uniId}/${user}` : "";
  // Option Data
  const faculties = [
    "Arts",
    "Engineering",
    "Environment",
    "Mathematics",
    "Science",
  ];
  const terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"];
  const housings = [
    "Provided and guaranteed for by university",
    "Provided, but I needed to apply for it and was successful",
    "I did not manage to get student housing and had to find external accomodations",
  ];
  const favAspects = [
    "Cultural immersion",
    "Making new friends",
    "Travelling/exploring",
    "Other",
  ];
  const meals = [
    "I regularly ate at the school canteen/caferteria",
    "I mainly cooked on my own",
    "I mainly ate out at restaurants",
    "Mix of cooking and eating out places",
  ];

  function close() {
    props.setOpen(false);
  }

  return userPresent ? (
    <div className="ratings-box">
      <div className="padding">
        <form action={url} method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <p className="add-a-review">Add A Review</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <p>Faculty</p>
                {Slct("faculty", faculties)}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <p>Exchange Term</p>
                {Slct("term", terms)}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Housing</p>
                {Slct("housing", housings)}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Favourite Aspect of Exchange</p>
                {Slct("favourite", favAspects)}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Food Situation</p>
                {Slct("food", meals)}
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                <p>Additional thoughts</p>
                <TextField
                  id="outlined-multiline-static"
                  label="Tell us about your time abroad..."
                  multiline
                  rows={4}
                  fullWidth
                  name="freeform"
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <p className="my-experience-was">My experience was ...</p>
            </Grid>
            <Grid item xs={6}>
              <div>
                <CustomRating
                  text="Safe"
                  name="safety"
                  readOnly={false}
                  val={9}
                ></CustomRating>
              </div>
            </Grid>
            <Grid item xs>
              <div>
                <CustomRating
                  text="Fun"
                  name="fun"
                  readOnly={false}
                  val={9}
                ></CustomRating>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <CustomRating
                  text="Affordable"
                  name="affordable"
                  readOnly={false}
                  val={9}
                ></CustomRating>
              </div>
            </Grid>
            <Grid item xs>
              <div>
                <CustomRating
                  text="Easy"
                  name="easy"
                  readOnly={false}
                  val={9}
                ></CustomRating>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div></div>
            </Grid>
            <Grid item xs={3}>
              <div onClick={close}>{XChangeButton("Cancel")}</div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Button
                  sx={{
                    backgroundColor: "#E0D03B",
                    color: "black",
                    fontStyle: "italic",
                  }}
                  style={{ width: "100%" }}
                  type="submit"
                >
                  <div className="button-text">Save</div>
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  ) : (
    <div
      className="unlogged-dialog-content"
      style={{ width: "100%", padding: 30 }}
    >
      <h3>You must be logged in first!</h3>
    </div>
  );
}

export default AddAReview;
