import "./Landing.css";
import XChangeButton from "./XChangeButton.js";
import { Text } from "react-native";
import React from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/joy/Link";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Plane } from "./assets/Vector-5.svg";
import { ReactComponent as Suitcase } from "./assets/Vector-6.svg";
import { ReactComponent as Baggage } from "./assets/Vector-7.svg";

const font = "Helvetica";

const TitleText = () => {
  const titleText = "Change";
  const bodyText =
    "\nEverything you need to plan your exchange term is here,\nwith hundreds of universities and student reviews, as\nwell as past approved course equivalents by school\nand program.";

  return (
    <Text style={{ fontFamily: font }}>
      <Text style={{ fontSize: 70, fontWeight: "bold" }}>
        <Text style={{ color: "#E0D03B" }}>X</Text>
        {titleText}
      </Text>
      <div class="body-padding"></div>
      <Text style={{ fontSize: 20, fontStyle: "italic" }}>{bodyText}</Text>
    </Text>
  );
};

const OtherLinks = () => {
  const about = "About";
  const contact = "Contact";
  const priv = "Privacy Policy";

  return (
    <Text
      style={{
        fontFamily: font,
        fontSize: 15,
        textDecorationLine: "underline",
        color: "#000000",
        fontWeight: "100",
        fontStyle: "italic",
      }}
    >
      {about}
      {"\n"}
      {contact}
      {"\n"}
      {priv}
    </Text>
  );
};

function loginField(txt) {
  return (
    <TextField
      id="outlined-basic"
      label={txt}
      variant="outlined"
      style={{ backgroundColor: "#FFFFFF", borderRadius: "4pt", width: "100%" }}
    ></TextField>
  );
}

function Landing() {
  const navigate = useNavigate();

  return (
    <div class="flex-container">
      <div class="flex-item1">
        <div class="landing-text-padding">{TitleText()}</div>
        <div class="left-buttons-padding">
          {XChangeButton("Search for schools", "/universities")}
          {XChangeButton("Search for courses", "/course/home")}
        </div>
        <div class="links-padding">{OtherLinks()}</div>
      </div>
      <div class="flex-item2">
        <div class="login-panel">
          <div
            style={{
              position: "fixed",
              marginTop: "-65px",
              marginLeft: "35px",
            }}
          >
            <Suitcase style={{ scale: "2" }} />
          </div>
          <div
            style={{
              position: "fixed",
              marginTop: "-90px",
              marginLeft: "120px",
            }}
          >
            <Baggage style={{ scale: "2.5" }} />
          </div>
          <div class="login-body">
            <Text
              style={{
                fontFamily: font,
                fontSize: 30,
                fontWeight: "bold",
                color: "#1E1E1E",
              }}
            >
              Login with email
            </Text>
            {loginField("Email")}
            {loginField("Password")}
            <div class="login-link">
              <Link
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
                Don't have an account?
              </p>
              <Link
                style={{
                  fontFamily: font,
                  fontSize: 15,
                  fontWeight: "100",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                  textDecorationColor: "black",
                  color: "black",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign up.
              </Link>
            </div>
            {XChangeButton("Login", "/", undefined, {
              width: "325px",
            })}
          </div>
        </div>
        <div style={{ marginTop: "30px", marginLeft: "285px" }}>
          <Plane style={{ scale: "2" }} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
