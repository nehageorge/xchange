import React from "react";
import { useNavigate } from "react-router-dom";

function PagePreview(props) {
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <div style={{ padding: "2em" }}>
      <div
        style={{ alignItems: "center", textAlign: "center" }}
        onClick={() => goToPage(props.page)}
      >
        <img
          src={props.imageURL}
          alt={props.altText}
          style={{ maxHeight: 230, paddingBottom: "0.5em" }}
        ></img>
        <h3>{props.title} </h3>
      </div>
      <p style={{ padding: "1em" }}>{props.description}</p>
    </div>
  );
}

export default PagePreview;
