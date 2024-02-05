import "./UniversitySearch.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { TextField, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeTable from "./XchangeTable";
import Competitiveness from "./Competitiveness";

function UniversitySearch() {
  const [unis, setUnis] = useState([]);
  const [allUnis, setAllUnis] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/universities").then((res) => {
      res.json().then((data) => {
        setAllUnis(data);
        if (search.length == 0) {
          setUnis(data);
        }
      });
      hideLoader();
    });
  }, []);

  function handleSearch(newSearch) {
    console.log(process.env.REACT_APP_PROXY)
    setSearch(newSearch);
    if (newSearch.length == 0) {
      setUnis(allUnis);
      return;
    }
    fetch(process.env.REACT_APP_PROXY + "/search_unis/" + newSearch).then((res) =>
      res.json().then((data) => {
        if (newSearch.length != 0) {
          setUnis(data);
        }
      })
    );
  }

  function hideLoader() {
    document.getElementById("loader-div").style.visibility = "hidden";
  }

  return (
    <div className="Home">
      <XchangeTabbedHeader />
      <View>
        <img
          src="/singapore_skyline.png"
          alt="Panoramic view of Singapore city"
          style={{
            maxHeight: 340,
            objectFit: "cover",
          }}
        ></img>
        {/* Picture sourced from https://live.staticflickr.com/916/43142094942_2742225a90_b.jpg */}
      </View>
      <div class="page-loader" id="loader-div">
        <div class="spinner"></div>
        <div class="txt">Loading...</div>
      </div>
      <View style={{ flex: 1, padding: 45 }}>
        <TextField
          sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
          name="search"
          label="Search for university programs"
          variant="outlined"
          InputLabelProps={{ style: { fontSize: 20 } }}
        />
        <br></br>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <XchangeTable
          headers={["Program Name", "Languages", "Terms", "Competitiveness"]}
          colWidths={["35%", "15%", "25%", "25%"]}
          numRows={unis.length}
          tableBody={unis.map((uni) => (
            <TableRow
              key={uni.program}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell>
                <Link
                  component="th"
                  scope="row"
                  style={{ fontSize: 15 }}
                  to={`/get_uni/${uni.id}/0`}
                >
                  {uni.program}
                </Link>
                <br></br>
                <Text style={{ fontStyle: "italic" }}>{uni.location}</Text>
              </TableCell>
              <TableCell>{uni.languages}</TableCell>
              <TableCell>{uni.terms}</TableCell>
              <TableCell>{Competitiveness(uni.competition)}</TableCell>
            </TableRow>
          ))}
          outline={true}
        />
      </View>
    </div>
  );
}

export default UniversitySearch;
