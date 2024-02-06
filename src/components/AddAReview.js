import "./AddAReview.css";
import XChangeButton from "./XChangeButton.js";
import CustomRating from "./CustomRating.js";

import * as React from "react";
import { Text } from "react-native";
import { Button, TextField, Select, MenuItem, Grid } from "@mui/material";

function Slct(name, st, options = []) {
  const [slct, setSlct] = React.useState("");

  const handleChange = (event) => {
    setSlct(event.target.value);
    st(event.target.value);
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
  const url = userPresent ? `/get_uni/discussion/${props.uniId}/${user}` : `/get_uni/discussion/${props.uniId}`;
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

  const defaultRating = 9

  const [message, setMessage] = React.useState("")
  const [fullName, setName] = React.useState("")

  const [facultyS, setFaculty] = React.useState("")
  const [termS, setTerm] = React.useState("")
  const [houseS, setHouse] = React.useState("")
  const [favS, setFav] = React.useState("")
  const [foodS, setFood] = React.useState("")

  const [safetyR, setSafety] = React.useState(defaultRating)
  const [funR, setFun] = React.useState(defaultRating)
  const [affordableR, setAffordable] = React.useState(defaultRating)
  const [easyR, setEasy] = React.useState(defaultRating)

  const fac = Slct("faculty", setFaculty, faculties)
  const ter = Slct("term", setTerm, terms)
  const house = Slct("housing", setHouse, housings)
  const fav = Slct("favourite", setFav, favAspects)
  const food = Slct("food", setFood, meals)

  const safety = CustomRating({text: "Safe", name: "safety", readOnly: false, val: 9, ref: setSafety})
  const fun = CustomRating({text: "Fun", name: "fun", readOnly: false, val: 9, ref: setFun})
  const affordable = CustomRating({text: "Affordable", name: "affordable", readOnly: false, val:9, ref: setAffordable})
  const easy = CustomRating({text: "Easy", name: "easy", readOnly: false, val: 9, ref: setEasy})

  const handleSubmit = (e) => {
    e.preventDefault()

    const request = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: fullName,
        faculty: facultyS,
        term: termS,
        housing: houseS,
        favourite: favS,
        food: foodS,
        safety: '' + safetyR,
        fun: '' + funR, 
        affordable: '' + affordableR,
        easy: '' + easyR,
      })
    };

    fetch(process.env.REACT_APP_PROXY + url, request)
    .then(response => {
        response.json().then(
          (val) => {
            const msg = val["status"]
            if (msg == "unknown") {
              setMessage("An error occurred. Please try again.")
            } else if (msg == "success") {
              //setMessage("your review has been successfuly uploaded. reload the page to see changes")
              window.location.reload()
              //console.log("/get_uni/" + props.uniId + "/2")
              //navigate("/get_uni/" + props.uniId + "/2")
            } 
          }
        )
      }
    )
  }

  function close() {
    props.setOpen(false);
  }

  return userPresent ? (
    <div className="ratings-box">
      <div className="padding">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>
                <p className="add-a-review">Add A Review</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <p>Faculty</p>
                {fac}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div>
                <p>Exchange Term</p>
                {ter}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Housing</p>
                {house}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Favourite Aspect of Exchange</p>
                {fav}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <p>Food Situation</p>
                {food}
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
                {safety}
              </div>
            </Grid>
            <Grid item xs>
              <div>
                {fun}
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                {affordable}
              </div>
            </Grid>
            <Grid item xs>
              <div>
                {easy}
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
          <Text>{message}</Text>
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
