import React from "react";
import { Text } from "react-native";
import { TextField, Button } from "@mui/material";
import XchangeTopBar from "./XchangeTopBar";


function ForgotPassword() {
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
        <form action="/forgot_password" method="POST">
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
              ></TextField>
              <br></br>
              <br></br>
              <Button
                sx={{ backgroundColor: "#E0D03B" }}
                style={{ width: "100%" }}
              >
                <div class="button-text">
                  <Text style={{ width: "325px" }}>Reset Password</Text>
                </div>
              </Button>
            </form>
            </div>
            </center>
        </>
    )

}

export default ForgotPassword;