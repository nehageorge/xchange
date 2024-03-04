import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Text } from "react-native";
import XchangeTopBar from "./XchangeTopBar";
import XChangeButton from "./XChangeButton.js";

function ConfirmUserSuccess() {
    const params = useParams();
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault()

      fetch(process.env.REACT_APP_PROXY + "/confirm_user_success/" + params.token)
      .then(response => {
          response.json().then(
            (val) => {
              const msg = val["status"]
              if (msg == "invalid") {
                setMessage("Your confirmation link is invalid or expired. Please sign up again.")
              } else if (msg == "success") {
                setMessage("Success! You may now log in.")
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
          <form onSubmit={handleSubmit}>
            <div
              style={{
                width: "50%",
                background: "#D8D8D8",
                borderRadius: "12pt",
                padding: "50px",
              }}
            >
              <Button
                sx={{ backgroundColor: "#E0D03B" }}
                style={{ width: "100%" }}
                type="submit"
              >
                <div class="button-text">
                  <Text style={{ width: "325px" }}>Confirm User</Text>
                </div>
              </Button>
            </div>
            <Text>{message}</Text>
          </form>
        </center>
      </div>
    </>
  );
}

export default ConfirmUserSuccess;
