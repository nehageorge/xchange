import React from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";
import XchangeTopBar from "./XchangeTopBar";

function Signup() {
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
            <form action="/signup" method="POST">
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#1E1E1E",
                }}
              >
                Sign Up
              </Text>
              <br></br>
              <br></br>
              <Text style={{ fontSize: 15 }}>University of Waterloo Email</Text>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4pt",
                  width: "100%",
                }}
              ></TextField>
              <br></br>
              <br></br>
              <Text style={{ fontSize: 15 }}>Password</Text>
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4pt",
                  width: "100%",
                }}
              ></TextField>
              <br></br>
              <br></br>
              <Text style={{ fontSize: 15 }}>Confirm password</Text>
              <TextField
                type="password"
                name="confirm_password"
                label="Password"
                variant="outlined"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4pt",
                  width: "100%",
                }}
              ></TextField>
              <br></br>
              <br></br>
              <Button
                sx={{ backgroundColor: "#E0D03B" }}
                style={{ width: "100%" }}
                type="submit"
              >
                <div className="button-text">
                  <Text style={{ width: "325px" }}>Sign Up</Text>
                </div>
              </Button>
            </form>
          </div>
        </center>
      </div>
    </>
  );
}

export default Signup;
