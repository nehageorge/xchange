import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Rating from "@mui/material/Rating";
import Circle from "@mui/icons-material/Circle";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#8b8b8b",
  },
  "& .MuiRating-iconHover": {
    color: "#8b8b8b",
  },
  "& .MuiRating-iconEmpty": {
    color: "#d9d9d9",
  },
});

function CustomRating(props) {
  const [value, setValue] = React.useState(props.val);
  const [hover, setHover] = React.useState(props.val);

  return (
    <div style={{ maxHeight: 400, maxWidth: 300, paddingBottom: "1rem" }}>
      <Typography component="legend">{props.text}</Typography>
      <Box
        sx={{
          "& > legend": { mt: 2 },
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
        }}
      >
        <StyledRating
          name={props.name}
          readOnly={props.readOnly}
          value={value}
          defaultValue={9}
          max={10}
          style={{ paddingRight: 10 }}
          getLabelText={(value) => `${value} Circle${value !== 1 ? "s" : ""}`}
          precision={1}
          icon={<Circle fontSize="inherit" />}
          emptyIcon={<Circle fontSize="inherit" />}
          onChange={(event, newValue) => {
            setValue(newValue == null ? 0 : newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover == null ? 0 : newHover);
          }}
        />
        <div name={props.name}>{`${value} / 10`}</div>
      </Box>
    </div>
  );
}

export default CustomRating;
