import React from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";

function Add() {
  return (
    <div className="Add">
      <center>
        <h2>Add Image to Repository</h2>

        <div>
          <form action="/new_image" method="POST">
            <Text>Name</Text>
            <br></br>
            <TextField name="name" label="Image name" variant="standard" />
            <br></br>
            <br></br>
            <Text>Labels</Text>
            <br></br>
            <TextField
              name="labels"
              label="Comma-seperated"
              variant="standard"
            />
            <br></br>
            <br></br>
            <Text>Url</Text>
            <br></br>
            <TextField name="url" label="Image Url" variant="standard" />
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
