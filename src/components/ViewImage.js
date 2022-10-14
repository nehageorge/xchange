import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useParams } from "react-router-dom";

function ViewImage() {
  const params = useParams();
  const [currImage, setCurrImage] = useState({});

  useEffect(() => {
    fetch("/get_image/" + params.name).then((res) =>
      res.json().then((data) => {
        setCurrImage(data);
      })
    );
  }, []);

  return (
    <div>
      <img src={currImage["url"]} alt={params.name} />
      <br></br>
      <Text>Labels: </Text>
      <Text>{renderLabels(currImage["labels"])} </Text>
    </div>
  );
}

function renderLabels(labels) {
  var ret = "";
  try {
    ret = labels.join(", ");
  } finally {
    return ret;
  }
}

export default ViewImage;
