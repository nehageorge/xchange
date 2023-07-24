import React from "react";
import { Button } from "@mui/material";
import { Text } from "react-native";
import { useSearchParams } from "react-router-dom";
import XchangeTopBar from "./XchangeTopBar";

function SignupError() {
  const [searchParams, _] = useSearchParams();
  return (
    <>
      <XchangeTopBar />
      <div className="Signup">
        <center>
          <div
            style={{
              width: "50%",
              background: "#D8D8D8",
              borderRadius: "12pt",
              padding: "50px",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#1E1E1E",
              }}
            >
              Sign Up Unsuccessful
            </Text>
            <br></br>
            <br></br>
            <Text style={{ fontSize: 15 }}>{searchParams.get("problem")}</Text>
            <br></br>
            <br></br>
            <Button
              sx={{ backgroundColor: "#E0D03B" }}
              style={{ width: "100%" }}
              href="/signup"
            >
              <div class="button-text">
                <Text style={{ width: "325px" }}>Try again</Text>
              </div>
            </Button>
          </div>
        </center>
      </div>
    </>
  );
}

export default SignupError;
