import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "react-native";

function Update() {
  const params = useParams();
  const [labelsValue, setLabelsValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  return (
    <div className="Update">
      <center>
        <h2>Update Image in Repository</h2>

        <div>
          <br></br>
          <Text>Labels</Text>
          <br></br>
          <TextField
            value={labelsValue}
            onChange={(event) => {
              setLabelsValue(event.target.value);
            }}
            name="labels"
            label="Comma-seperated"
            variant="standard"
          />
          <br></br>
          <br></br>
          <Text>Url</Text>
          <br></br>
          <TextField
            value={urlValue}
            onChange={(event) => {
              setUrlValue(event.target.value);
            }}
            name="url"
            label="Image Url"
            variant="standard"
          />
          <br></br>
          <br></br>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </center>
    </div>
  );
  function handleSubmit() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlValue, labels: labelsValue }),
      redirect: "follow",
    };
    fetch(`/update_image/${params.name}`, requestOptions).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  }
}

export default Update;
