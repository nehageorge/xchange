import React from "react";
import { Button } from "@mui/material";
import XchangeTopBar from "./XchangeTopBar";
import { Text } from "react-native";
import { useSearchParams } from "react-router-dom";

function LoginSuccess() {
  const [searchParams, _] = useSearchParams();
  window.sessionStorage.setItem("token", searchParams.get("token"));
  window.sessionStorage.setItem("user", searchParams.get("user"));

  return (
    <>
      <XchangeTopBar />
      <div className="Login">
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
              Log In Successful!
            </Text>
            <br></br>
            <br></br>
            <Text style={{ fontSize: 15 }}>You're all set!</Text>
            <br></br>
            <br></br>
            <Button
              sx={{ backgroundColor: "#E0D03B" }}
              style={{ width: "100%", marginBottom: 10 }}
              href="/universities"
            >
              <div class="button-text">
                <Text style={{ width: "325px" }}>Search for universities</Text>
              </div>
            </Button>
            <Button
              sx={{ backgroundColor: "#E0D03B" }}
              style={{ width: "100%" }}
              href="/course/home"
            >
              <div class="button-text">
                <Text style={{ width: "325px" }}>Search for courses</Text>
              </div>
            </Button>
          </div>
        </center>
      </div>
    </>
  );
}

export default LoginSuccess;
