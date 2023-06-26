import "./Home.css";
import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  AppBar,
  TableCell,
  TableRow,
} from "@mui/material";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import XchangeTable from "./XchangeTable";

function Home() {
  const [unis, setUnis] = useState([]);
  const [allUnis, setAllUnis] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/index").then((res) =>
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
          src="https://live.staticflickr.com/916/43142094942_2742225a90_b.jpg"
          alt="Panoramic view of Singapore city"
          style={{ maxHeight: 400 }}
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
                <Stack direction="row">
                  <Box
                    sx={{
                      backgroundColor: () => {
                        let comp = uni.competition.toLowerCase();
                        if (comp == "ultra competitive") return "red";
                        else if (comp == "very competitive") return "#ECE54B";
                        else if (comp == "competitive") return "#48C246";
                        else return "blue";
                      },
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      marginRight: "5px",
                    }}
                  ></Box>
                  <Text style={{ margin: "10px", top: "50%" }}>
                    {uni.competition}
                  </Text>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        />
      </View>
    </div>
  );
}

export default Home;