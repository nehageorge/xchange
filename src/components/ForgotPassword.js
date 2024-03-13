import React from "react";
import { Text } from "react-native";
import { TextField, Button } from "@mui/material";
import XchangeTopBar from "./XchangeTopBar";

function ForgotPassword() {

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const request = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email, 
      })
    }; 

    fetch(process.env.REACT_APP_PROXY + "/forgot_password", request)
    .then(response => {
        response.json().then(
          (val) => {
            const msg = val["status"]
            console.log(msg)
            if (msg == "unknown") {
              setMessage("An unknown error occurred. Please try again.")
            } else if (msg == "success") {
              setMessage("Reset request sent. Check your mail.")
            } else if (msg == "no-email") {
              setMessage("This email is not registered. Please try again.")
            }
          }
        )
      }
    )
  }

    return(
        <>
        <XchangeTopBar />
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
                Forgot Password? 
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
              <Button
                sx={{ backgroundColor: "#E0D03B" }}
                style={{ width: "100%" }}
                type="submit"
              >
                <div className="button-text">
                  <Text style={{ width: "325px" }}>Reset Password</Text>
                </div>
              </Button>
              {
                <Text>{message}</Text>
              }
            </form>
            </div>
            </center>
        </>
    )

}

export default ForgotPassword;