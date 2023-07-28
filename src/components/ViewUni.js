import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import UniversityOverviewContent from "./UniversityOverviewContent";
import PreviouslyApprovedCourses from "./PreviouslyApprovedCourses";
import Discussion from "./Discussion";

function ViewUni() {
  const params = useParams();
  const [content, setContent] = useState(0);    // Defaults to overview page
  const [currUni, setCurrUni] = useState({});

  useEffect(() => {
    fetch("/get_uni/" + params.name).then((res) =>
      res.json().then((data) => {
        setCurrUni(data);
      })
    );
  }, []);

  function UniversityButton(txt = "", disabled = false, id = 0) {
    return(
      <div class='button'>
        <Button 
          sx={{backgroundColor: disabled ? "#D8D8D8" : "#E0D03B", boxShadow: content === id ? 3 : 0}} 
          style={{width: '100%'}}
          onClick={() => { setContent(id); }}>
            <div class="button-text">
                <Text style={{fontWeight:"bold"}}>{txt}</Text>
            </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="UniversityOverview">
    <XchangeTabbedHeader />
    <h4>{currUni["name"]}</h4>
    {/* <h4>Duck</h4> */}
    <h4>{params.name}</h4>
    <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 20 }}>
        <Grid container spacing = {2} paddingBottom={3}>
            <Grid item xs={2}>
              {UniversityButton("Overview", content!==0, 0)}
            </Grid>
            <Grid item xs={3}>
              {UniversityButton("Previously Approved Courses", content!==1, 1)} 
            </Grid>
            <Grid item xs={2}>
              {UniversityButton("Discussion", content!==2, 2)}
            </Grid>
        </Grid>
        {content === 0 ? 
          <UniversityOverviewContent /> : content === 1 ? <PreviouslyApprovedCourses uniName ={params.name} /> : <Discussion/>
          // TODO: put the previously approved courses page (1) and disscussion page (2) heres
        }
    </View>
</div>
  );
}

export default ViewUni;
