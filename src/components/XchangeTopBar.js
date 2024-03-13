import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';


function XchangeTopBar() {
  const navigate = useNavigate();
  const user = window.sessionStorage.getItem("user");
  const userPresent = user ? true : false;
  const [displayBanner, setDisplayBanner] = useState("flex");

  const toHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Alert severity="info" onClose={() => { setDisplayBanner("none") }} display={{sm:"none", xs: displayBanner }}>
        For the optimal user experience, please view our site on desktop.
      </Alert>
      <div className="TopHeader" style={{ padding: "15px" }}>
      <span onClick={toHome} style = {{cursor: "pointer", display: "inline"}}>
        <h2 style={{ display: "inline" }}>UW&nbsp;</h2>
        <h2 style={{ color: "#E0D03B", display: "inline" }}>X</h2>
        <h2 style={{ display: "inline" }}>Change </h2>
      </span>
      <div style={{ flex: 1 }}></div>
      {userPresent && (
        <>
          <h5 style={{ paddingRight: "15px", paddingTop: "10px" }}>
            Hi, {user}
          </h5>
          <button
            className="LogoutButton"
            variant="contained"
            style={{
              border: "none",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onClick={() => {
              window.sessionStorage.clear();
              navigate("/");
            }}
          >
            <h5>Log out</h5>
          </button>
        </>
      )}
      {!userPresent && (
        <button
          className="LoginButton"
          variant="contained"
          onClick={() => navigate("/")}
        >
          <h5>Log in</h5>
        </button>
      )}
    </div>
    </div>
    
  );
}

export default XchangeTopBar;
