import "./CoursePageFilters.css";
import { Box, List, ListItem, ListItemButton, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";

function CoursePageFilters(props) {
  const xchangeGold = "rgba(224, 208, 59, 0.54)";
  const borderStyle = "1px solid #A8A8A8";

  const programList = [
    [0, ["Architectural Engineering", "AE"]],
    [1, ["Architecture", "ARCH"]],
    [2, ["Biomedical Engineering", "BME"]],
    [3, ["Chemical Engineering", "CHE"]],
    [4, ["Civil Engineering", "CIVE"]],
    [5, ["Computer Engineering", "CE"]],
    [6, ["Electrical Engineering", "EE"]],
    [7, ["Environmental Engineering", "ENVE"]],
    [8, ["Geological Engineering", "GEOE"]],
    [9, ["Management Engineering", "MSCI"]],
    [10, ["Mechanical Engineering", "ME"]],
    [11, ["Mechatronics Engineering", "MTE"]],
    [12, ["Nanotechnology  Engineering", "NE"]],
    [13, ["Software Engineering", "SE"]],
    [14, ["Systems Design Engineering", "SYDE"]],
  ];
  const programMap = new Map(programList);

  const uniMap = new Map();

  const selectedPrograms = new Map();
  const selectedUnis = new Map();

  const [programs, setPrograms] = useState(programMap);
  const [unis, setUnis] = useState(uniMap);
  const [selectPrograms, setSelectedPrograms] = useState(selectedPrograms);
  const [selectUnis, setSelectedUnis] = useState(selectedUnis);
  const [programSearch, setProgramSearch] = useState("");
  const [programSearchResults, setProgramSearchResults] = useState(new Map());
  const [uniSearch, setUniSearch] = useState("");
  const [uniSearchResults, setUniSearchResults] = useState(new Map());

  useEffect(() => {
    fetch(process.env.REACT_APP_PROXY + "/universities?" + new URLSearchParams({ program: 0 })).then(
      (res) => {
        res.json().then((data) => {
          setUnis(getInitialUniNames(data));
        });
      }
    );
  }, []);

  function getInitialUniNames(data) {
    const uniNames = new Map();
    for (const item of data) {
      if (String(item.name).includes("(")) {
        uniNames.set(item.id, [
          String(item.name),
          String(item.name).match(/\(([^)]+)\)/)[1],
        ]);
      } else {
        uniNames.set(item.id, [
          item.name,
          String(item.name)
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join(""),
        ]);
      }
    }
    return uniNames;
  }

  function onProgramFilterClick(id) {
    const newSelectedMap = new Map(selectPrograms);
    const newProgramMap = new Map(programs);

    const programFilters = [...props.programFiltersState];

    if (programs.has(id)) {
      newSelectedMap.set(id, programs.get(id));
      newProgramMap.delete(id);
      // Add program name to the program filters in child element
      const programName = programs.get(id)[0];
      programFilters.push(programName);
    } else {
      newProgramMap.set(id, selectPrograms.get(id));
      newSelectedMap.delete(id);
      // Remove the program name from program filters in child element
      const programName = selectPrograms.get(id)[0];
      var index = programFilters.indexOf(programName);
      if (index !== -1) {
        programFilters.splice(index, 1);
      }
    }
    if (programSearchResults.has(id)) {
      const newFilteredMap = new Map(programSearchResults);
      newFilteredMap.delete(id);
      setProgramSearch("");
      setProgramSearchResults(newFilteredMap);
    }

    setSelectedPrograms(newSelectedMap);
    setPrograms(newProgramMap);

    // Reflect the changes using the setState function passed by parent
    props.setProgramFiltersState(programFilters);
  }

  function onUniFilterClick(id) {
    const newSelectedMap = new Map(selectUnis);
    const newUniMap = new Map(unis);

    const uniFilters = [...props.uniFiltersState];

    if (unis.has(id)) {
      newSelectedMap.set(id, unis.get(id));
      newUniMap.delete(id);

      // Add university name to the university filters in child element
      const uniName = unis.get(id)[0];
      uniFilters.push(uniName);
    } else {
      newUniMap.set(id, selectUnis.get(id));
      newSelectedMap.delete(id);

      // Remove university name from the university filters in child element
      const uniName = selectUnis.get(id)[0];
      var index = uniFilters.indexOf(uniName);
      if (index !== -1) {
        uniFilters.splice(index, 1);
      }
    }
    if (uniSearchResults.has(id)) {
      const newFilteredMap = new Map(uniSearchResults);
      newFilteredMap.delete(id);
      setUniSearch("");
      setUniSearchResults(newFilteredMap);
    }
    setSelectedUnis(newSelectedMap);
    setUnis(newUniMap);
    // Reflect the changes using the setState function passed by parent
    props.setUniFiltersState(uniFilters);
  }

  useEffect(() => {
    const filteredData = new Map();
    for (let [key, value] of programs.entries()) {
      if (
        value[0].toLowerCase().includes(programSearch.toLowerCase()) ||
        value[1].toLowerCase().includes(programSearch.toLowerCase())
      ) {
        filteredData.set(key, value);
      }
    }
    setProgramSearchResults(filteredData);
  }, [programSearch]);

  useEffect(() => {
    const filteredData = new Map();
    for (let [key, value] of unis.entries()) {
      if (
        value[0].toLowerCase().includes(uniSearch.toLowerCase()) ||
        value[1].toLowerCase().includes(uniSearch.toLowerCase())
      ) {
        filteredData.set(key, value);
      }
    }
    setUniSearchResults(filteredData);
  }, [uniSearch]);

  return (
    <div className="CoursePageFilters">
      <Box
        sx={{
          maxWidth: 350,
          height: 565,
          border: borderStyle,
          borderRadius: 2,
        }}
      >
        <div className="ProgramFilter">
          <div className="FilterTitle">
            <h6>Program</h6>
          </div>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <div
              className="SearchBar"
              style={{ paddingLeft: 5, paddingTop: 5, paddingRight: 5 }}
            >
              <TextField
                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)", width: "100%" }}
                inputProps={{
                  style: {
                    padding: 10,
                    fontSize: 16,
                  },
                }}
                onChange={(event) => {
                  setProgramSearch(event.target.value);
                }}
                name="search"
                placeholder="Search program"
                variant="outlined"
                InputLabelProps={{ style: { fontSize: 12 } }}
              />
            </div>
            <ScrollView horizontal={true}>
              {[...selectPrograms.keys()].map((key) => (
                <div style={{ paddingTop: 5, paddingRight: 5 }}>
                  <ListItem
                    sx={{ background: xchangeGold, borderRadius: 2 }}
                    onClick={() => {
                      onProgramFilterClick(key);
                    }}
                  >
                    {selectPrograms.get(key)[1]}
                  </ListItem>
                </div>
              ))}
            </ScrollView>
          </View>
          <List sx={{ maxHeight: 175, overflow: "auto" }}>
            {programSearch.length > 0
              ? [...programSearchResults.keys()].map((key) => (
                  <ListItemButton
                    onClick={() => {
                      onProgramFilterClick(key);
                    }}
                  >
                    {programs.get(key)[0]}
                  </ListItemButton>
                ))
              : [...programs.keys()].map((key) => (
                  <ListItemButton
                    onClick={() => {
                      onProgramFilterClick(key);
                    }}
                  >
                    {programs.get(key)[0]}
                  </ListItemButton>
                ))}
          </List>
        </div>
        <div style={{ paddingBottom: 10 }}></div>
        <div
          className="UniversityFilter"
          style={{ borderTop: borderStyle, borderRadius: 5 }}
        >
          <div className="FilterTitle">
            <Box component="div" display={{sm:"flex", xs:"none"}}><h6>University</h6></Box>
            <Box component="div" display={{sm:"none", xs:"flex"}}><h6>Unis</h6></Box>
          </div>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <div
              className="SearchBar"
              style={{ paddingLeft: 5, paddingTop: 5, paddingRight: 5 }}
            >
              <TextField
                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)", width: "100%" }}
                inputProps={{
                  style: {
                    padding: 10,
                    fontSize: 16,
                  },
                }}
                onChange={(event) => {
                  setUniSearch(event.target.value);
                }}
                name="search"
                placeholder="Search university"
                variant="outlined"
                InputLabelProps={{ style: { fontSize: 12 } }}
              />
            </div>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ justifyContent: "center" }}
            >
              {[...selectUnis.keys()].map((key) => (
                <div style={{ paddingTop: 5, paddingRight: 5 }}>
                  <ListItem
                    sx={{ background: xchangeGold, borderRadius: 3 }}
                    onClick={() => {
                      onUniFilterClick(key);
                    }}
                  >
                    {selectUnis.get(key)[1]}
                  </ListItem>
                </div>
              ))}
            </ScrollView>
          </View>
          <List sx={{ maxHeight: 175, overflow: "auto" }}>
            {uniSearch.length > 0
              ? [...uniSearchResults.keys()].map((key) => (
                  <ListItemButton
                    onClick={() => {
                      onUniFilterClick(key);
                    }}
                  >
                    {unis.get(key)[0]}
                  </ListItemButton>
                ))
              : [...unis.keys()].map((key) => (
                  <ListItemButton
                    onClick={() => {
                      onUniFilterClick(key);
                    }}
                  >
                    {unis.get(key)[0]}
                  </ListItemButton>
                ))}
          </List>
        </div>
      </Box>
    </div>
  );
}

export default CoursePageFilters;
