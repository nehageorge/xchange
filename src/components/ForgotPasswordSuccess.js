import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Text } from "react-native";
import XchangeTopBar from "./XchangeTopBar";

function ForgotPasswordSuccess() {
    const params = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault()
      const request = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          password: password, 
          confirmPassword: confirmPassword
        })
      };
  
      fetch(process.env.REACT_APP_PROXY + "/forgot_password_success/" + params.token, request)
      .then(response => {
          response.json().then(
            (val) => {
              const msg = val["status"]
              if (msg == "invalid") {
                setMessage("Your signup link is invalid or expired. Please request to make a new password again.")
              } else if (msg == "success") {
                setMessage("Success! You may now log in with your new password.")
              } else if (msg == "mismatch") {
                setMessage("Your passwords didn't match. Please try again.")
              }
            }
          )
        }
      )
    }

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
            <form onSubmit={handleSubmit}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "#1E1E1E",
                }}
              >
                Change Password
              </Text>
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
                <div class="button-text">
                  <Text style={{ width: "325px" }}>Confirm new password</Text>
                </div>
              </Button>
              <Text>{message}</Text>
            </form>
          </div>
        </center>
      </div>
    </>
  );
}

export default ForgotPasswordSuccess;
