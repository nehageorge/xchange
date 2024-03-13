import "./Landing.css";
import XChangeButton from "./XChangeButton.js";
import Alert from '@mui/material/Alert';
import { Text } from "react-native";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Link from "@mui/joy/Link";
import { ReactComponent as Plane } from "./assets/Vector-5.svg";
import { ReactComponent as Suitcase } from "./assets/Vector-6.svg";
import { ReactComponent as Baggage } from "./assets/Vector-7.svg";
import { useNavigate } from 'react-router-dom';

const font = "Helvetica";

const TitleText = () => {
  const titleText = "Change";
  const bodyText =
    "\nEverything you need to plan your exchange term is here, with hundreds of universities and student reviews, as well as past approved course equivalents by school and program.";

  return (
    <Text style={{ fontFamily: font }}>
      <Text style={{ fontSize: "3.7rem", fontWeight: "bold" }}>
        <Text>UW&nbsp;</Text>
      </Text>
      <Text style={{ fontSize: "3.7rem", fontWeight: "bold", whiteSpace: "nowrap" }}>
        <Text style={{ color: "#E0D03B" }}>X</Text>
        Change
      </Text>
      <div className="body-padding"></div>
      <Text style={{ fontSize: "1.2rem", fontStyle: "italic", width: "50%" }}>
        {bodyText}
      </Text>
    </Text>
  );
};

const OtherLinks = (linkText, path) => {
  return (
    <Link
      href={path}
      style={{
        fontFamily: font,
        fontSize: "1rem",
        fontWeight: "100",
        fontStyle: "italic",
        textDecorationLine: "underline",
        textDecorationColor: "black",
        color: "black",
      }}
    >
      {linkText}
    </Link>
  );
};

function Landing() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("IDHAR HAI")
    const request = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        email: email, 
        password: password,
      })
    };

    fetch(process.env.REACT_APP_PROXY + "/", request)
    .then(response => {
        response.json().then(
          (val) => {
            const msg = val["status"]
            if (msg == "success") {
              window.sessionStorage.setItem("token", val["token"]);
              window.sessionStorage.setItem("user", val["user"]);
              navigate("/login_success")
            } else {
              navigate("/login_error" + "?problem=" + msg)
            }
          }
        )
      }
    )
  }

  return (
    <div>
      <Alert severity="info" onClose={() => {}} display={{sm:"none", xs:"flex"}}>
        For the optimal user experience, please view our site on desktop.
      </Alert>
      <div className="flex-container">
      <div className="flex-item1">
        <div className="landing-text-padding">{TitleText()}</div>
        <div className="left-buttons-padding">
          {XChangeButton("Search for schools", "/universities")}
          {XChangeButton("Search for courses", "/course/search")}
        </div>
        <div className="links-padding">
          {OtherLinks("About", "/about")}
          {OtherLinks("Contact", "/contact")}
          {OtherLinks("Privacy Policy and Terms", "/privacy")}
        </div>
      </div>
      <div className="flex-item2">
        <div className="login-panel">
          <div
            style={{
              marginTop: "-65px",
              marginLeft: "35px",
            }}
          >
            <Suitcase style={{ scale: "2" }} />
          </div>
          <div
            style={{
              marginTop: "-95px",
              marginLeft: "120px",
            }}
          >
            <Baggage style={{ scale: "2.5" }} />
          </div>
          <div className="login-body">
            <form onSubmit={handleSubmit}>
              <Text
                style={{
                  fontFamily: font,
                  fontSize: "50%",
                  fontWeight: "bold",
                  color: "#1E1E1E",
                }}
              >
                Login with email
              </Text>
              <div style={{ padding: 10 }}></div>
              <TextField
                id="outlined-basic"
                label="Email"
                name="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4pt",
                  width: "100%",
                }}
              ></TextField>
              <div style={{ padding: 5 }}></div>
              <TextField
                id="outlined-basic"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "4pt",
                  width: "100%",
                }}
              ></TextField>
              <Link
                href="/forgot_password"
                style={{
                  fontFamily: font,
                  fontSize: 15,
                  fontWeight: "100",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                  textDecorationColor: "black",
                  color: "black",
                }}
              >
                Forgot your password?
              </Link>
              <p
                style={{
                  fontFamily: font,
                  fontSize: 15,
                  fontWeight: "100",
                  fontStyle: "italic",
                  color: "black",
                }}
              >
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  style={{
                    fontFamily: font,
                    fontSize: 15,
                    fontWeight: "100",
                    fontStyle: "italic",
                    textDecorationLine: "underline",
                    textDecorationColor: "black",
                    color: "black",
                  }}
                >
                  {" "}
                  Sign up
                </Link>
              </p>
              <Button
                sx={{ backgroundColor: "#E0D03B" }}
                style={{ width: "100%" }}
                type="submit"
              >
                <div className="button-text">
                  <Text style={{ width: "325px" }}>Log in</Text>
                </div>
              </Button>
            </form>
          </div>
        </div>
        <div style={{ marginTop: "30px", marginLeft: "285px" }}>
          <Plane style={{ scale: "2" }} />
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Landing;
