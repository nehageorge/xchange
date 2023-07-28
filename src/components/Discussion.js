import "./Discussion.css";
import XChangeButton from "./XChangeButton.js";
import CustomRating from "./CustomRating.js";
import AddAReview from "./AddAReview.js";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

import List from "@mui/material/List";

function AddAReviewDialog(uniId) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{XChangeButton("Add a Review")}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <AddAReview setOpen={setOpen} uniId={uniId} />
      </Dialog>
    </div>
  );
}

function Review(post) {
  return (
    <div className="review-bg">
      <div className="user">
        <div className="duck-img"></div>
        {post["student_name"]}
      </div>
      <div className="review">
        <div className="review-title">
          <div className="bold">
            {`${post["student_faculty"]} / ${post["student_term"]}`}
          </div>
        </div>
        <div className="text">
          <div className="bold"> Housing:</div>
          &nbsp;{post["housing"]}
        </div>
        <div className="text">
          <div className="bold"> Favourite Aspect:</div>
          &nbsp;{post["favourite_aspect"]}
        </div>
        <div className="text">
          <div className="bold"> Food Situation:</div>
          &nbsp;{post["food_situation"]}
        </div>
      </div>
      <div className="vertical-line"></div>
      <div className="user-rating-categories">
        <div className="bold"> Safe:</div>
        <div className="bold"> Fun:</div>
        <div className="bold"> Affordable: </div>
        <div className="bold"> Easy:</div>
      </div>
      <div className="user-ratings">
        <Typography>{`${post["safe_rating"]}/10`}</Typography>
        <Typography>{`${post["fun_rating"]}/10`}</Typography>
        <Typography>{`${post["affordable_rating"]}/10`}</Typography>
        <Typography>{`${post["easy_rating"]}/10`}</Typography>
      </div>
    </div>
  );
}

function Discussion(props) {
  const params = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/get_uni/discussion/" + params.id).then((res) =>
      res.json().then((data) => {
        setPosts(data);
      })
    );
  }, []);

  return (
    <div className="row">
      <div className="col" style={{ maxWidth: 450 }}>
        <div className="section-title">Ratings</div>
        <div className="ratings-box">
          <div className="ratings">
            {CustomRating("Safe", "", true)}
            {CustomRating("Fun", "", true)}
            {CustomRating("Affordable", "", true)}
            {CustomRating("Easy", "", true)}
            <div style={{ maxHeight: 20, paddingBottom: "1.5rem" }}>
              {AddAReviewDialog(props.uniId)}
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="section-title">Reviews</div>
        <List style={{ maxHeight: "65vh", overflow: "auto" }}>
          {posts.map((post) => Review(post))}
        </List>
      </div>
    </div>
  );
}

export default Discussion;
