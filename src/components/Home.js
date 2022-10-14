import "./Home.css";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Chip, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const [allImages, setAllImages] = useState([])
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/index").then((res) =>
      res.json().then((data) => {
        setAllImages(data.map((img) => img[1]))
        if (search.length == 0) {
          setImages(data.map((img) => img[1]))
        }
      })
    );
  }, []);

  const navigate = useNavigate();

  const addHandler = () => navigate("/new_image");

  function handleSearch(newSearch) {
    setSearch(newSearch)
    if (newSearch.length == 0) {
      setImages(allImages)
      return
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const url = `https://us-central1-otot-b-363407.cloudfunctions.net/search_http?search=${newSearch}&images=${allImages.join(",")}`
    fetch(url, requestOptions)
    .then((res) =>
      res.json().then((data) => {
        if (newSearch.length != 0) {
          var imgLst = data['images'].split(",");
          if (imgLst[0] == '') {
            imgLst = [];
          }
          setImages(imgLst);
        }
      })
    );
  }

  return (
    <div className="Home">
      <h1>
        <b>Neha George's Image Repository</b>
      </h1>
      <Button onClick={addHandler}>Add new image</Button>
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
          {images.map((image) => {
            return (
              <div key={image} style={{ border: "thin solid black" }}>
                <br></br>
                <Chip color="primary" label={image} />
                <br></br>
                <br></br>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button onClick={() => navigate(`/get_image/${image}`)}>
                    View
                  </Button>
                  <Button onClick={() => navigate(`/update_image/${image}`)}>
                    Update
                  </Button>
                  <Button onClick={() => navigate(`/delete_image/${image}`)}>
                    Delete
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
