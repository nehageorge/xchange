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
  const [safety, setSafety] = useState(0);
  const [fun, setfun] = useState(0);
  const [affordable, setAffordable] = useState(0);
  const [easy, setEasy] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/get_uni/discussion/" + params.id).then((res) =>
      res.json().then((data) => {
        setPosts(data);
      })
    );
  }, []);

  useEffect(() => {
    setSafety(getAveragesRatings(posts, "safe_rating"));
    setfun(getAveragesRatings(posts, "fun_rating"));
    setAffordable(getAveragesRatings(posts, "affordable_rating"));
    setEasy(getAveragesRatings(posts, "easy_rating"));
  }, [posts]);

  const getAveragesRatings = (posts, param) => {
    var avg = 0;
    for (let post of posts) {
      avg += post[param];
    }

    return Math.round(avg / posts.length);
  };

  return (
    <div className="row">
      <div className="col" style={{ maxWidth: 450 }}>
        <div className="section-title">Ratings</div>
        <div className="ratings-box">
          <div className="ratings" key={safety}>
            <CustomRating
              text="Safe"
              name=""
              readOnly={true}
              val={isNaN(safety) ? 0 : safety}
            ></CustomRating>
            <CustomRating
              text="Fun"
              name=""
              readOnly={true}
              val={isNaN(fun) ? 0 : fun}
            ></CustomRating>
            <CustomRating
              text="Affordable"
              name=""
              readOnly={true}
              val={isNaN(affordable) ? 0 : affordable}
            ></CustomRating>
            <CustomRating
              text="Easy"
              name=""
              readOnly={true}
              val={isNaN(easy) ? 0 : easy}
            ></CustomRating>
            <div style={{ maxHeight: 20, paddingBottom: "1.5rem" }}>
              {AddAReviewDialog(props.uniId)}
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="section-title">Reviews</div>
        <List style={{ maxHeight: "65vh", overflow: "auto" }}>
          {posts.map((post) => Review(post)).reverse()}
        </List>
      </div>
    </div>
  );
}

export default Discussion;
