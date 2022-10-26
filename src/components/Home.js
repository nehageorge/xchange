import "./Home.css";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Chip, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const [unis, setUnis] = useState([]);
  const [allUnis, setAllUnis] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/index").then((res) =>
      res.json().then((data) => {
        setAllUnis(data.map((uni) => uni[0]))
        if (search.length == 0) {
          setUnis(data.map((uni) => uni[0]))
        }
      })
    );
  }, []);

  const navigate = useNavigate();

  const addHandler = () => navigate("/new_uni");

  function handleSearch(newSearch) {
    setSearch(newSearch)
    if (newSearch.length == 0) {
      setUnis(allUnis)
      return
    }
    fetch("/search_unis/"+newSearch)
    .then((res) =>
      res.json().then((data) => {
        if (newSearch.length != 0) {
          setUnis(data.map((uni) => uni[0]))
        }
      })
    );
  }

  return (
    <div className="Home">
      <h1>
        <b>XChange </b>
      </h1>
      <Button onClick={addHandler}>Add new uni</Button>
      <br></br>
      <TextField
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        name="search"
        label="Search"
        variant="standard"
      />
      <br></br><br></br>
      <View>
        <ul>
          {unis.map((uni) => {
            return (
              <div key={uni} style={{ border: "thin solid black" }}>
                <br></br>
                <Chip color="primary" label={uni} />
                <br></br>
                <br></br>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button onClick={() => navigate(`/get_uni/${uni}`)}>
                    View
                  </Button>
                </ButtonGroup>
                <br></br>
                <br></br>
              </div>
            );
          })}
        </ul>
      </View>
    </div>
  );
}

export default Home;
