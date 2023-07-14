import "./CoursePageFilters.css";
import { Box, List, ListItem, ListItemButton, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";

function CoursePageFilters() {
    const xchangeGold = "rgba(224, 208, 59, 0.54)";
    const borderStyle = "1px solid #A8A8A8";

    const programList = [[0, ["Software Engineering", "SE"]], [1,["Biomedical Engineering", "BME"]], [2, ["Civil Engineering", "CIVE"]], [3, ["Management Engineering", "MSCI"]], [4, ["Mechanical Engineering", "ME"]], [5, ["Computer Science", "CS"]]];
    const programMap = new Map(programList);

    const uniList = [[0,["National University of Singapore", "NUS"]], [1, ["Bilkent University", "BU"]], [2, ["Deakin University", "DU"]], [3, ["Ewha Womans University", "EWHA"]], [4, ["Griffith University", "GU"]], [5, ["University of Leeds", "LISS"]]];
    const uniMap = new Map(uniList);
    
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

    function onProgramFilterClick(id) {
        const newSelectedMap = new Map(selectPrograms);
        const newProgramMap = new Map(programs);

        if(programs.has(id)) {
            newSelectedMap.set(id, programs.get(id))
            newProgramMap.delete(id);
        } else {
            newProgramMap.set(id, selectPrograms.get(id));
            newSelectedMap.delete(id);
        }
        if(programSearchResults.has(id)) {
            const newFilteredMap = new Map(programSearchResults);
            newFilteredMap.delete(id);
            setProgramSearch("");
            setProgramSearchResults(newFilteredMap);
        }
        setSelectedPrograms(newSelectedMap);
        setPrograms(newProgramMap);
    }

    function onUniFilterClick(id) {
        const newSelectedMap = new Map(selectUnis);
        const newUniMap = new Map(unis);

        if(unis.has(id)) {
            newSelectedMap.set(id, unis.get(id));
            newUniMap.delete(id);
        } else {
            newUniMap.set(id, selectUnis.get(id));
            newSelectedMap.delete(id);
        }
        if(uniSearchResults.has(id)) {
            const newFilteredMap = new Map(uniSearchResults);
            newFilteredMap.delete(id);
            setUniSearch("");
            setUniSearchResults(newFilteredMap);
        }
        setSelectedUnis(newSelectedMap);
        setUnis(newUniMap);
    }

    useEffect(() => { 
        const filteredData = new Map();
        for(let [key, value] of programs.entries()) {
            if (value[0].toLowerCase().includes(programSearch.toLowerCase()) 
            || value[1].toLowerCase().includes(programSearch.toLowerCase())) {
                filteredData.set(key, value);
            }
        }
        setProgramSearchResults(filteredData);
    }, [programSearch])

    useEffect(() => { 
        const filteredData = new Map();
        for(let [key, value] of unis.entries()) {
            if (value[0].toLowerCase().includes(uniSearch.toLowerCase()) 
            || value[1].toLowerCase().includes(uniSearch.toLowerCase())) {
                filteredData.set(key, value);
            }
        }
        setUniSearchResults(filteredData);
    }, [uniSearch])

    return(
        <div className="CoursePageFilters">
            <Box sx={{maxWidth: 350, height: 550, border:borderStyle, borderRadius:2}}>
                <div className="ProgramFilter">
                    <div className="FilterTitle"><h5>Program</h5></div>
                    <View style={{ flex: 1, flexDirection:"row" }}>
                        <div className="SearchBar" style={{paddingLeft:5, paddingTop:5, paddingRight: 5}}>
                            <TextField
                                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)", width: 145}}
                                inputProps={{
                                    style: {
                                    padding: 10,
                                    fontSize: 16 
                                    }
                                }}
                                onChange={(event) => {
                                    setProgramSearch(event.target.value);
                                }}
                                name="search"
                                placeholder="Search program"
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 12} }}
                            />
                        </div>     
                        <ScrollView horizontal={true}>                        
                            {[...selectPrograms.keys()].map((key) => 
                                <div style={{paddingTop:5, paddingRight:5}}>
                                    <ListItem sx={{background:xchangeGold, borderRadius:2}} onClick={() => {onProgramFilterClick(key)}}>
                                        {selectPrograms.get(key)[1]}
                                    </ListItem>
                                </div>
                            )}
                        </ScrollView>                                          
                    </View>             
                    <List sx={{maxHeight: 175, overflow:"auto"}}>
                        {programSearch.length > 0 ?
                            [...programSearchResults.keys()].map((key) =>
                                <ListItemButton onClick={() => {onProgramFilterClick(key)}}>
                                    {programs.get(key)[0]}
                                </ListItemButton>
                            )
                        :
                            [...programs.keys()].map((key) =>
                                <ListItemButton onClick={() => {onProgramFilterClick(key)}}>
                                    {programs.get(key)[0]}
                                </ListItemButton>
                            )
                        }
                    </List>
                </div>
                <div style={{paddingBottom:10}}></div>
                <div className="UniversityFilter" style={{borderTop:borderStyle, borderRadius:5}}>
                    <div className="FilterTitle"><h5>University</h5></div>
                    <View style={{ flex: 1, flexDirection:"row" }}>
                        <div className="SearchBar" style={{paddingLeft:5, paddingTop:5, paddingRight: 5}}>
                            <TextField
                                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)", width: 145}}
                                inputProps={{
                                    style: {
                                    padding: 10,
                                    fontSize: 16
                                    }
                                }}
                                onChange={(event) => {
                                    setUniSearch(event.target.value);
                                }}
                                name="search"
                                placeholder="Search university"
                                variant="outlined"
                                InputLabelProps={{ style: { fontSize: 12} }}
                            />
                        </div>      
                        <ScrollView horizontal={true} contentContainerStyle={{  justifyContent: 'center' }}>
                            {[...selectUnis.keys()].map((key) => (
                                <div style={{paddingTop:5, paddingRight: 5}}>
                                    <ListItem sx={{background:xchangeGold, borderRadius:3}} onClick={() => {onUniFilterClick(key)}}>
                                        {selectUnis.get(key)[1]}
                                    </ListItem>
                                </div>
                            ))}
                        </ScrollView>                 
                    </View>
                    <List sx={{maxHeight: 175, overflow:"auto"}}>
                        {uniSearch.length > 0 ?
                            [...uniSearchResults.keys()].map((key) =>
                                <ListItemButton onClick={() => {onUniFilterClick(key)}}>
                                    {unis.get(key)[0]}
                                </ListItemButton>
                            ) 
                        :
                            [...unis.keys()].map((key) =>
                                <ListItemButton onClick={() => {onUniFilterClick(key)}}>
                                    {unis.get(key)[0]}
                                </ListItemButton>
                            )
                        }
                    </List>
                </div>
            </Box>
        </div>
    );
}

export default CoursePageFilters;