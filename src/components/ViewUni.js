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
  const [content, setContent] = useState(Number(params.page));
  const [currUni, setCurrUni] = useState({});

  useEffect(() => {
    fetch("/get_uni/" + params.id).then((res) =>
      res.json().then((data) => {
        setCurrUni(data);
      })
    );
  }, []);

  function UniversityButton(txt = "", disabled = false, id = 0) {
    return (
      <div className="button">
        <Button
          sx={{
            backgroundColor: disabled ? "#D8D8D8" : "#E0D03B",
            boxShadow: content === id ? 3 : 0,
          }}
          style={{ width: "100%" }}
          onClick={() => {
            setContent(id);
          }}
        >
          <div className="button-text">
            <Text style={{ fontWeight: "bold" }}>{txt}</Text>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="UniversityOverview">
      <XchangeTabbedHeader />
      <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 20 }}>
        <h3 style={{ paddingBottom: 10 }}>{currUni["name"]}</h3>
        <Grid container spacing={2} paddingBottom={3}>
          <Grid item xs={2}>
            {UniversityButton("Overview", content !== 0, 0)}
          </Grid>
          <Grid item xs={3}>
            {UniversityButton("Previously Approved Courses", content !== 1, 1)}
          </Grid>
          <Grid item xs={2}>
            {UniversityButton("Discussion", content !== 2, 2)}
          </Grid>
        </Grid>
        {content === 0 ? (
          <UniversityOverviewContent />
        ) : content === 1 ? (
          <PreviouslyApprovedCourses uniName={currUni["name"]} />
        ) : (
          <Discussion uniId={params.id} />
        )}
      </View>
    </div>
  );
}

export default ViewUni;
