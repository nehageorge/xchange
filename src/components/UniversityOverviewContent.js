import "./UniversityOverviewContent.css";
import { View } from "react-native";
import React from "react";
import { Card, CardContent, Grid, TableCell, TableRow } from "@mui/material";
import Competitiveness from "./Competitiveness";
import XchangeTable from "./XchangeTable";

function UniversityOverviewContent(props) {
  const facultyColours = new Map([
    ["Arts", "rgba(243, 23, 23, 0.35)"],
    ["Engineering", "rgba(149, 24, 225, 0.35)"],
    ["Environment", "rgba(72, 194, 70, 0.35)"],
    ["Health", "rgba(24, 213, 225, 0.35)"],
    ["Mathematics", "rgba(234, 37, 190, 0.35)"],
    ["Science", "rgba(24, 69, 225, 0.35)"],
  ]);

  // Competitiveness
  const competitiveness = String(props.uni.competition);
  // Faculties, Academic Level, Requirements, Tuition Info
  const firstColumnBlock = [
    ["Faculties", String(props.uni.faculties).split(",")],
    ["Level:", props.uni.academic_level],
    ["Requirements:", props.uni.requirements],
    ["Tuition:", props.uni.tuition],
  ];
  // Course Info - currently not scraped
  const courseInfo = [
    "Course Info:",
    props.uni.courseInfo ? props.uni.courseInfo : "",
  ];
  // Term Dates
  const dateInfo = String(props.uni.dates).replace('"', "").split("~");
  const termHeaders = [dateInfo[0], dateInfo[1], dateInfo[2]];
  var termInfo = [];
  for (let i = 3; i < dateInfo.length; i++) {
    if (i + 2 >= dateInfo.length) break;
    termInfo.push([dateInfo[i], dateInfo[i + 1], dateInfo[i + 2]]);
    i += 2;
  }
  // Transcript Info
  const transcriptInfo = ["Transcript:", props.uni.transcript];
  // Housing, Financial Support, Wellness Planning - currently not scraped, Contacts
  const secondColumnBlock = [
    ["Housing:", props.uni.housing],
    ["Financial Support:", props.uni.financial_support],
    ["Wellness Planning:", props.uni.wellness ? props.uni.wellness : ""],
    ["Contacts:", props.uni.contact],
  ];
  // Other Info - currently not scraped
  const otherInfo = [
    "Other Info:",
    props.uni.otherInfo ? props.uni.otherInfo : "",
  ];
  // Cost Info
  const costHeaders = ["Costs for one term", props.uni.cost_disclaimer];
  const costs = String(props.uni.cost).replace('"', "").split("~");
  var costInfo = [];
  for (let i = 0; i < costs.length; i++) {
    if (i + 1 >= costs.length) break;
    costInfo.push([costs[i], costs[i + 1]]);
    i += 1;
  }

  function FacultyBubble(facultyName) {
    const clr = facultyColours.get(facultyName.trim());

    return (
      <div
        style={{
          padding: 5,
          background: clr,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        {facultyName}
      </div>
    );
  }

  function FacultyInformationRow(faculties = []) {
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        item
        spacing={2}
        alignItems="flex-end"
      >
        <Grid item item xs={1.5}>
          Faculties:
        </Grid>
        {faculties.map((faculty) => (
          <Grid item>
            <div>{FacultyBubble(faculty)}</div>
          </Grid>
        ))}
      </Grid>
    );
  }

  function UniversityInformationColumnItem(row) {
    return (
      <Grid item container direction="row" alignItems="left">
        <Grid item xs={1.5} sx={{ whiteSpace: "pre-wrap" }}>
          {row[0]}
        </Grid>
        <Grid item sx={{ whiteSpace: "pre-wrap" }}>
          {row[1]}
        </Grid>
      </Grid>
    );
  }

  function UniversityInformationColumn(info) {
    return (
      <div className="UniversityInformation">
        <Grid
          container
          spacing={3}
          item
          spacing={3}
          direction="column"
          justifyContent="left"
          alignItems="left"
        >
          {info.map((row) =>
            row[0].toLowerCase() == "faculties"
              ? FacultyInformationRow(row[1])
              : UniversityInformationColumnItem(row)
          )}
        </Grid>
      </div>
    );
  }

  function TableContent(tableInfo) {
    const tableContent = [];
    for (const row of tableInfo) {
      tableContent.push(
        <TableRow>
          {row.map((col) => (
            <TableCell component="th" scope="row">
              <div>
                <p>{col}</p>
              </div>
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return tableContent;
  }

  function UniversityInformationRow(info, tableHeaders, tableInfo, colWidths) {
    return (
      <Grid
        container
        spacing={3}
        item
        spacing={3}
        direction="row"
        justifyContent="left"
        alignItems="left"
        paddingTop={3}
      >
        <Grid item xs={6}>
          <div className="UniversityInformation">
            <Card variant="outlined" sx={{ height: 250, overflow: "auto" }}>
              <CardContent sx={{ whiteSpace: "pre-wrap" }}>
                {`${info[0]}\n\n${info[1]}`}
              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Card
            variant="outlined"
            sx={{ height: 270, overflow: "auto", borderRadius: 2, padding: 0 }}
          >
            <CardContent sx={{ whiteSpace: "pre-wrap", padding: 0 }}>
              <XchangeTable
                headers={tableHeaders}
                colWidths={colWidths}
                numRows={tableInfo.length}
                tableBody={TableContent(tableInfo)}
                outline={false}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <div className="UniversityOverviewContent">
      <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 10 }}>
        <div className="UniversityInformationBox">
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="left"
            paddingTop={1}
          >
            <div className="Competitiveness" style={{ paddingBottom: 15 }}>
              {Competitiveness(competitiveness)}
            </div>
            {UniversityInformationColumn(firstColumnBlock)}
            {UniversityInformationRow(courseInfo, termHeaders, termInfo, [
              "25%",
              "30%",
              "25%",
            ])}
            <div className="TranscriptInformation">
              {UniversityInformationColumnItem(transcriptInfo)}
            </div>
            {UniversityInformationColumn(secondColumnBlock)}
            {UniversityInformationRow(otherInfo, costHeaders, costInfo, [
              "30%",
              "25%",
            ])}
          </Grid>
        </div>
      </View>
    </div>
  );
}

export default UniversityOverviewContent;
