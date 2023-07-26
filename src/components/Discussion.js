import "./Discussion.css";
import XChangeButton from "./XChangeButton.js";
import CustomRating from "./CustomRating.js";
import AddAReview from "./AddAReview.js";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

import List from "@mui/material/List";

function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{XChangeButton("Add a Review")}</div>
      <Dialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <AddAReview setOpen={setOpen} />
      </Dialog>
    </div>
  );
}

function Review() {
  return (
    <div class="review-bg">
      <div class="user">
        <div class="duck-img"></div>
        Katie George
      </div>
      <div class="review">
        <div class="review-title">
          <div class="bold"> Science / 3B </div>
        </div>
        <div class="text">
          <div class="bold"> Housing:</div>
          &nbsp;Provided and Guaranteed by school
        </div>
        <div class="text">
          <div class="bold"> Favourite Aspect:</div>
          &nbsp;Cultural immersion
        </div>
        <div class="text">
          <div class="bold"> Food Situation:</div>
          &nbsp;Most often cooked
        </div>
      </div>
      <div class="vertical-line"></div>
      <div class="user-rating-categories">
        <div class="bold"> Safe:</div>
        <div class="bold"> Fun:</div>
        <div class="bold"> Affordable: </div>
        <div class="bold"> Easy:</div>
      </div>
      <div class="user-ratings">
        <Typography>9/10</Typography>
        <Typography>9/10</Typography>
        <Typography>9/10</Typography>
        <Typography>9/10</Typography>
      </div>
    </div>
  );
}

function Discussion() {
  // TODO: the ratings section here allows for it to be changed on this page
  // it should be fixed, display only, non editable..
  // add bool param to custom rating function for whether it's fixed or not
  return (
    <div class="row">
      <div class="col" style={{ maxWidth: 450 }}>
        <div class="section-title">Ratings</div>
        <div class="ratings-box">
          <div class="ratings">
            {CustomRating("Safe", true)}
            {CustomRating("Fun", true)}
            {CustomRating("Affordable", true)}
            {CustomRating("Easy", true)}
            <div style={{ maxHeight: 20, paddingBottom: "1.5rem" }}></div>
            {SimpleDialogDemo()}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="section-title">Reviews</div>
        <List style={{ maxHeight: "65vh", overflow: "auto" }}>
          {Review()}
          {Review()}
          {Review()}
        </List>
      </div>
    </div>
  );
}

export default Discussion;
