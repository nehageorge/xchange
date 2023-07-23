import { useNavigate } from "react-router-dom";

function XchangeTopBar() {
  const navigate = useNavigate();

  return (
    <div className="TopHeader" style={{ padding: "15px" }}>
      <h2 style={{ color: "#E0D03B" }}>X</h2>
      <h2>Change </h2>
      <div style={{ flex: 1 }}></div>
      <button
        className="LoginButton"
        variant="contained"
        onClick={() => navigate("/")}
      >
        <h5>Log in</h5>
      </button>
    </div>
  );
}

export default XchangeTopBar;
