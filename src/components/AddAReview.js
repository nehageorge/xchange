import "./AddAReview.css";
import XChangeButton from "./XChangeButton.js";
import CustomRating from "./CustomRating.js";

import * as React from "react";
import { TextField, Select, MenuItem, Grid } from "@mui/material";

function textBox(txt) {
  return (
    <TextField
      id="outlined-basic"
      label={txt}
      name={txt}
      variant="outlined"
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "4pt",
        width: "90%",
      }}
    ></TextField>
  );
}

function Slct(txt) {
  const [slct, setSlct] = React.useState(2);

  const handleChange = (event) => {
    setSlct(event.target.value);
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={slct}
      label={txt}
      onChange={handleChange}
      style={{ width: "100%", backgroundColor: "#ffffff" }}
    >
      <MenuItem value={10}>AAAA</MenuItem>
      <MenuItem value={20}>BBBB</MenuItem>
      <MenuItem value={30}>CCCC</MenuItem>
    </Select>
  );
}

function AddAReview(props) {

  function close() {
    props.setOpen(false);
  }

  return (
    <div class="ratings-box">
      <div class="padding">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <p class="add-a-review">Add A Review</p>
              <p>Full name</p>
              {textBox("Full Name")}
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p>Faculty</p>
              <p>{Slct("Faculty")}</p>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div>
              <p>Exchange Term</p>
              <p>{Slct("Exchange Termn")}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <p>Housing</p>
              <p>{Slct("Housing")}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <p>Favourite Aspect of Exchange</p>
              <p>{Slct("Favourite Aspect of Exchange")}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <p>Food Situation</p>
              <p>{Slct("Food Situation")}</p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p class="my-experience-was">My experience was ...</p>
          </Grid>
          <Grid item xs={6}>
            <div>{CustomRating("Safe")}</div>
          </Grid>
          <Grid item xs={6}>
            <div>{CustomRating("Fun")}</div>
          </Grid>
          <Grid item xs={6}>
            <div>{CustomRating("Affordable")}</div>
          </Grid>
          <Grid item xs={6}>
            <div>{CustomRating("Easy")}</div>
          </Grid>
          <Grid item xs={6}>
            <div></div>
          </Grid>
          <Grid item xs={3}>
            <div onClick={close}>{XChangeButton("Cancel")}</div>
          </Grid>
          <Grid item xs={3}>
            <div onClick={close}>{XChangeButton("Save")}</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddAReview;
