import { Box, Stack } from "@mui/material";
import React from "react";

function AddEquivalencyButton(props) {
  return (
    <div className="AddEquivalencyButton">
      <button
        style={{
          background: "none",
          padding: 0,
          border: "none",
          color: "black",
        }}
        onClick={props.onClick}
      >
        <Stack direction="row" spacing={-5}>
          <Stack spacing={-10}>
            <Box
              sx={{
                backgroundColor: "#ede88f",
                borderRadius: "50%",
                height: "60px",
                width: "60px",
              }}
              zIndex={2}
            ></Box>
            <p
              style={{
                fontSize: 60,
                color: "#e0d03b",
                zIndex: 3,
              }}
            >
              +
            </p>
          </Stack>
          <Stack spacing={-2}>
            <p style={{ paddingLeft: 5 }}>Have you been on exchange?</p>
            <Box
              style={{
                background: "rgba(228, 227, 227, 1)",
                borderRadius: 5,
                width: 310,
                height: 30,
                zIndex: 1,
              }}
            >
              <p style={{ paddingLeft: 5, paddingTop: 2 }}>
                Add Your Course Equivalency
              </p>
            </Box>
          </Stack>
        </Stack>
      </button>
    </div>
  );
}

export default AddEquivalencyButton;
