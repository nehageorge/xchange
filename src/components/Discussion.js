import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Circle from '@mui/icons-material/Circle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

function CustomizedRating() {

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Custom icon and color</Typography>
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
      <div>{`Selected: ${value}`}</div>
    </Box>
  );
}

function Discussion() {
    return (
        CustomizedRating()
    );
}

export default Discussion;