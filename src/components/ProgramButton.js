import React from "react";
import Box from "@mui/material/Box";

function ProgramButton(props) {
  return (
    <Box
      sx={{
        margin: "0.5rem",
        padding: "0.25rem",
        flexGrow: 1,
        borderRadius: "5px",
        border: 1,
        borderColor: "gray",
      }}
    >
      {props.text}
    </Box>
  );
}

export default ProgramButton;
