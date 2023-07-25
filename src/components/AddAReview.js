import "./AddAReview.css"
import XChangeButton from "./XChangeButton.js";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TextField, Select, MenuItem, Grid} from "@mui/material";

import Rating from '@mui/material/Rating';
import Circle from '@mui/icons-material/Circle';

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
    <div style={{ maxHeight: 400, maxWidth: 300, paddingBottom: "1rem" }}>
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
    )
}

function Slct(txt) {

    const [slct, setSlct] = React.useState(2);

    const handleChange = (event) => {
      setSlct(event.target.value);
    };

    return(
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={slct}
          label={txt}
          onChange={handleChange}
        >
          <MenuItem value={10}>AAAA</MenuItem>
          <MenuItem value={20}>BBBB</MenuItem>
          <MenuItem value={30}>CCCC</MenuItem>
        </Select>
    );
}

function AddAReview() {
    return (
        <div class='ratings-box'>
            <div class='add-a-review'>
                Add A Review
            </div>
            <div class='col'>
                <div class='name'>
                Full Name 
                {textBox('Full Name')}
                </div>
                <div class='row'>
                    <div class='input'>
                        Faculty
                        {Slct('Faculty')}
                    </div>
                    <div class='input'>
                        Exchange Term
                        {Slct('Exchange Term')}
                    </div>
                    <div class='input'>
                        Housing
                        {Slct('Housing')}
                    </div>
                </div>

                <div class='row'>
                    <div class='input'>
                        Favourite Aspect of Exchange
                        {Slct('Favourite Aspect of Exchange')}
                    </div>
                    <div class='input'>
                        Food Situation
                        {Slct('Food Situation')}
                    </div>
                </div>
            
                <div class='row'>
                    {CustomizedRating("Safe")}
                    {CustomizedRating("Fun")}
                </div>
                <div class='row'>
                    {CustomizedRating("Affordable")}
                    {CustomizedRating("Easy")}           
                </div>
                {XChangeButton("Add a Review")}
            </div>
        </div>
    );
}

export default AddAReview;