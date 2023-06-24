import "./Home.css";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, TextField, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import XchangeTabbedHeader from "./XchangeTabbedHeader";

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
      <View style={{ flex: 1, paddingVertical: 25, }}>
        <XchangeTabbedHeader />
      </View>
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
        <TableContainer
          sx={{ borderRadius: "15px", border: 1, borderColor: "gray" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(224, 208, 59, 0.5)" }}>
                <TableCell style={{ fontSize: "1.2rem" }}>
                  University Name
                </TableCell>
                <TableCell style={{ fontSize: "1.2rem" }}>Languages</TableCell>
                <TableCell style={{ fontSize: "1.2rem" }}>Terms</TableCell>
                <TableCell style={{ fontSize: "1.2rem" }}>
                  Competitiveness
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unis.map((uni) => (
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
                            else if (comp == "very competitive")
                              return "#ECE54B";
                            else if (comp == "competitive") return "#48C246";
                            else return "blue";
                          },
                          borderRadius: "50%",
                          height: "40px",
                          width: "40px",
                          marginRight: "5px",
                        }}
                      ></Box>
                      <View style={{ margin: "10px", top: "50%" }}>
                        {uni.competition}
                      </View>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </View>
    </div>
  );
}

export default Home;
