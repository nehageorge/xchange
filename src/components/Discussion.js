import "./Discussion.css"
import XChangeButton from "./XChangeButton.js";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Rating from '@mui/material/Rating';
import Circle from '@mui/icons-material/Circle';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#8b8b8b',
  },
  '& .MuiRating-iconHover': {
    color: '#8b8b8b',
  },
  '& .MuiRating-iconEmpty': {
    color: '#d9d9d9',
  },
});

function CustomizedRating(text) {

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

  return (
    <div style={{ maxHeight: 400, paddingBottom: "1rem" }}>
        <Typography component="legend">{text}</Typography>
        <Box
        sx={{
            '& > legend': { mt: 2 },
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
        }}
        >
        <StyledRating
            name="customized-color"
            defaultValue={2}
            max={10}
            getLabelText={(value) => `${value} Circle${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<Circle fontSize="inherit" />}
            emptyIcon={<Circle fontSize="inherit" />}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
                setHover(newHover);
            }}
        />
        <div>{`${value} / 10`}</div>
        </Box>
    </div>
  );
}

function Review() {
    return (
        <div class='review-bg'>
            <div class='user'>
                <div class='duck-img'></div>
                Katie George
            </div>
            <div class='review'>
                <div class='review-title'>
                    <div class='bold'> Science / 3B </div>
                </div>
                <div class='text'>
                    <div class='bold'> Housing:</div>
                    &nbsp;Provided and Guaranteed by school 
                </div>
                <div class='text'>
                    <div class='bold'> Favourite Aspect:</div>
                    &nbsp;Cultural immersion
                    </div>
                <div class='text'>
                    <div class='bold'> Food Situation:</div>
                    &nbsp;Most often cooked
                </div>
            </div>
            <div class='vertical-line'></div>
            <div class='user-rating-categories'>
                <div class='bold'> Safe:</div>
                <div class='bold'> Fun:</div>
                <div class='bold'> Affordable: </div>
                <div class='bold'> Easy:</div>
            </div>
            <div class='user-ratings'>
                <Typography>9/10</Typography>
                <Typography>9/10</Typography>
                <Typography>9/10</Typography>
                <Typography>9/10</Typography>
            </div>
        </div>
    );
}

function Discussion() {
    return (
        <div>
            <div class='section-title'>
                Ratings
            </div>
            <div class='ratings-box'>
                <div class='ratings'>
                    {CustomizedRating("Safe")}
                    {CustomizedRating("Fun")}
                    {CustomizedRating("Affordable")}
                    {CustomizedRating("Easy")}
                    <div style={{ maxHeight: 20, paddingBottom: "1.5rem" }}></div>
                    {XChangeButton("Add a Review")}
                </div>
            </div>
            <div class='section-title'>
                Reviews
            </div>
            {Review()}
        </div>
    );
}

export default Discussion;