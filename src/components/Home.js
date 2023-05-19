import "./Home.css";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

  const navigate = useNavigate();

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
      <View style={{ flex: 1, padding: 25 }}>
        <div className="TopBar">
          <h1 style={{ color: "gold" }}>X</h1>
          <h1>Change </h1>

          <TextField
            onChange={(event) => {
              handleSearch(event.target.value);
            }}
            name="search"
            label="Search"
            variant="standard"
            style={{ marginLeft: "2rem", width: "1000" }}
            fullWidth
          />
        </div>
      </View>
      <View>
        <img src="https://live.staticflickr.com/916/43142094942_2742225a90_b.jpg" alt="Panoramic view of city" style={{ maxHeight: 600 }}></img>
      </View>
      <View style={{ flex: 1, padding: 25 }}>
        <View>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold' }}>University</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold' }}>Languages</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold' }}>Terms</TableCell>
                  <TableCell align="right" style={{fontWeight: 'bold' }}>Competitiveness</TableCell>
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
                    <TableCell component="th" scope="row" style={{ color: "blue",  textDecoration: "underline" }}>
                      {uni.name}
                    </TableCell>
                    <TableCell align="right">{uni.languages}</TableCell>
                    <TableCell align="right">{uni.terms}</TableCell>
                    <TableCell align="right">{uni.competition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </View>
      </View>
    </div>
  );
}

export default Home;
