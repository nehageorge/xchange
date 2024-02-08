import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Text } from "react-native";
import XchangeTopBar from "./XchangeTopBar";
import XChangeButton from "./XChangeButton.js";

function ConfirmUserSuccess() {
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
          confirm_password: confirmPassword
        })
      };
  
      fetch(process.env.REACT_APP_PROXY + "/confirm_user_success/" + params.token, request)
      .then(response => {
          response.json().then(
            (val) => {
              const msg = val["status"]
              if (msg == "invalid") {
                setMessage("Your signup link is invalid or expired. Please request to make a new password again.")
              } else if (msg == "success") {
                setMessage("Success! You may now log in with your new password.")
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
            {XChangeButton("Confirm user", "/confirm_user_success")}
          </div>
          <Text>{message}</Text>
        </center>
      </div>
    </>
  );
}

export default ConfirmUserSuccess;
