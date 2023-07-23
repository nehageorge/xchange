import "./UniversitySearch.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, TextField, Stack, TableCell, TableRow } from "@mui/material";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeTable from "./XchangeTable";
import Competitiveness from "./Competitiveness";

function UniversitySearch() {
  const [unis, setUnis] = useState([]);
  const [allUnis, setAllUnis] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/universities").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setAllUnis(data);
        if (search.length == 0) {
          setUnis(data);
        }
      })
    );
  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch);
    if (newSearch.length == 0) {
      setUnis(allUnis);
      return;
    }
    fetch("/search_unis/" + newSearch).then((res) =>
      res.json().then((data) => {
        if (newSearch.length != 0) {
          setUnis(data);
        }
      })
    );
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
      </View>
      <View style={{ flex: 1, padding: 45 }}>
        <TextField
          sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
          name="search"
          label="Search for universities"
          variant="outlined"
          InputLabelProps={{ style: { fontSize: 20 } }}
        />
        <br></br>
        <XchangeTable
          headers={["University Name", "Languages", "Terms", "Competitiveness"]}
          colWidths={["30%", "20%", "25%", "25%"]}
          tableBody={unis.map((uni) => (
            <TableRow
              key={uni.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                {uni.name}
              </TableCell>
              <TableCell>{uni.languages}</TableCell>
              <TableCell>{uni.terms}</TableCell>
              <TableCell>
                {Competitiveness(uni.competition)}
              </TableCell>
            </TableRow>
          ))}
          outline={true}
        />
      </View>
    </div>
  );
}

export default UniversitySearch;
