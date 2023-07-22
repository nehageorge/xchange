import "./Discussion.css"
import XChangeButton from "./XChangeButton.js";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Circle from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';

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
    <div>
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

function Discussion() {
    return (
        <div class='ratings-box'>
            <div class='ratings'>
                {CustomizedRating("Safe")}
                {CustomizedRating("Fun")}
                {CustomizedRating("Affordable")}
                {CustomizedRating("Easy")}
                {XChangeButton("Add a Review")}
            </div>
        </div>
    );
}

export default Discussion;