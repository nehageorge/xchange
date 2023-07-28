import React from "react";
import { Button } from "@mui/material";
import XchangeTopBar from "./XchangeTopBar";
import { Text } from "react-native";

function SignupSuccess() {
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
              Sign Up Successful!
            </Text>
            <br></br>
            <br></br>
            <Text style={{ fontSize: 15 }}>
              New user has been created. You can now save universities and
              courses, as well as leave reviews!
            </Text>
            <br></br>
            <br></br>
            <Button
              sx={{ backgroundColor: "#E0D03B" }}
              style={{ width: "100%" }}
              type="submit"
              href="/"
            >
              <div className="button-text">
                <Text style={{ width: "325px" }}>Go Home</Text>
              </div>
            </Button>
          </div>
        </center>
      </div>
    </>
  );
}

export default SignupSuccess;
