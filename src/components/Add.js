import React from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";

function Add() {
  return (
    <div className="Add">
      <center>
        <h2>Add University</h2>

        <div>
          <form action="/new_uni" method="POST">
            <Text>Name</Text>
            <br></br>
            <TextField name="name" label="University name" variant="standard" />
            <br></br>
            <br></br>
            <Text>Info</Text>
            <br></br>
            <TextField
              name="info"
              label="Description"
              variant="standard"
            />
            <br></br>
            <br></br>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Add;
