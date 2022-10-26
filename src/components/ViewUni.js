import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useParams } from "react-router-dom";

function ViewUni() {
  const params = useParams();
  const [currUni, setCurrUni] = useState({});

  useEffect(() => {
    fetch("/get_uni/" + params.name).then((res) =>
      res.json().then((data) => {
        setCurrUni(data);
      })
    );
  }, []);

  return (
    <div>
      <h2>{currUni["name"]}</h2>
      <Text>Info: </Text>
      <br></br>
      <Text>{currUni["info"]} </Text>
    </div>
  );
}

export default ViewUni;
