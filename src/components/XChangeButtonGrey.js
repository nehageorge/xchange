import "./XChangeButtonGrey.css";
import { Text } from "react-native";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const s = {
  fontStyle: "italic",
};

function XChangeButtonGrey(txt = "EMPTY", path = "", styl = s) {
  return (
    <Link to={path}>
      <div class="button">
        <Button sx={{ backgroundColor: "#E4E3E3" }} style={{ width: "100%" }}>
          <div class="button-text">
            <Text style={styl}>{txt}</Text>
          </div>
        </Button>
      </div>
    </Link>
  );
}

export default XChangeButtonGrey;
