import React from "react";
import { Text } from "react-native";
import { Box, Stack } from "@mui/material";

function Competitiveness(competition) {
  return (
    <Stack direction="row">
      <Box
        sx={{
          backgroundColor: () => {
            let comp = competition.toLowerCase();
            if (comp == "ultra competitive") return "red";
            else if (comp == "very competitive") return "#ECE54B";
            else if (comp == "competitive") return "#48C246";
            else return "rgba(0, 0, 0, 0)";
          },
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          marginRight: "5px",
        }}
      ></Box>
      <Text style={{ margin: "10px", top: "50%" }}>{competition}</Text>
    </Stack>
  );
}

export default Competitiveness;
