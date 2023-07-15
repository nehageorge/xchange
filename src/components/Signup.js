import React from "react";
import { TextField, Button } from "@mui/material";
import { Text } from "react-native";

function Signup() {
  return (
    <div className="Signup">
      <center>
        <h2>Sign Up</h2>

        <div>
          <form action="/signup" method="POST">
            <Text>User name</Text>
            <br></br>
            <TextField name="username" variant="standard" />
            <br></br>
            <br></br>
            <Text>Password</Text>
            <br></br>
            <TextField name="password" variant="standard" type="password" />
            <br></br>
            <br></br>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Signup;
