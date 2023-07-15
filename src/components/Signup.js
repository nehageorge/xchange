import React from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";
import { useNavigate } from "react-router-dom";
import XChangeButton from "./XChangeButton";

function Signup() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="TopHeader"
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <h2 style={{ color: "#E0D03B" }}>X</h2>
        <h2>Change </h2>
        <div style={{ flex: 1 }}></div>
        <button
          className="LoginButton"
          variant="contained"
          onClick={() => navigate("/")}
        >
          <h5>Log in</h5>
        </button>
      </div>
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
              {XChangeButton("Sign Up", "/", undefined, {
                width: "325px",
              })}
            </form>
          </div>
        </center>
      </div>
    </>
  );
}

export default Signup;
