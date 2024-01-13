import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";
import XchangeTopBar from "./XchangeTopBar";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const request = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email, 
        password: password,
        confirm_password: confirmPassword
      })
    };

    console.log("HERE");
    fetch(process.env.REACT_APP_PROXY + "/signup", request)
    .then(response => {
        response.json().then(
          (val) => {
            const msg = val["status"]
            if (msg == "success") {
              navigate("/signup_success")
            } else {
              navigate("/signup_error" + "?problem=" + msg)
            }
          }
        )
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>
        </center>
      </div>
    </form>
  );
}

export default Signup;
