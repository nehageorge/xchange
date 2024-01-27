import { Box, Stack } from "@mui/material";
import React from "react";

function AddIcon(props) {
  return (
    <div className="AddIcon">
      <Stack direction="row" spacing={-5}>
        <Stack spacing={-10}>
          <Box
            sx={{
              backgroundColor: "#ede88f",
              borderRadius: "50%",
              height: "60px",
              width: "60px",
            }}
            zIndex={1}
          ></Box>
          <p
            style={{
              fontSize: 60,
              color: "#e0d03b",
              zIndex: 2,
            }}
          >
            +
          </p>
        </Stack>
      </Stack>
    </div>
  );
}

export default AddIcon;
