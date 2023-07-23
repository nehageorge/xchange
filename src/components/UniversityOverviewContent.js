import "./UniversityOverviewContent.css";
import { View } from "react-native";
import React from "react";
import { Card, CardContent, Grid, TableCell, TableRow } from "@mui/material";
import Competitiveness from "./Competitiveness";
import XchangeTable from "./XchangeTable";

function UniversityOverviewContent() {
    const facultyColours = new Map([ 
        ["Art", "rgba(243, 23, 23, 0.35)"], 
        ["Engineering", "rgba(149, 24, 225, 0.35)"], 
        ["Environment", "rgba(72, 194, 70, 0.35)"], 
        ["Health", "rgba(24, 213, 225, 0.35)"], 
        ["Mathematics", "rgba(234, 37, 190, 0.35)"], 
        ["Science", "rgba(24, 69, 225, 0.35)"]  
    ]);
    // placeholder data
    const competitiveness = "Competitive";
    const firstColumnBlock = [
        ["Faculties", ["Art", "Engineering", "Environment", "Health", "Mathematics", "Science"]],
        ["Level", "Undergraduate"],
        ["Requirements", "Completed 2 years of university studies; minimum 70 GPA"],
        ["Tuition","You will pay your regular tuition fees to Waterloo (2.5 credits)"]
    ];
    const courseInfo = ["Course Info", "Engineering, Math and specifically CS modules are in high demand by NUS full time students so NUS CANNOT guarantee any courses for UW students especially core courses..."];
    const termHeaders = ["Host School\nTerm Name", "Term Dates", "Waterloo\nTerm Name"];
    const termInfo = [["First Semester", "August to December", "Fall"], ["Second Semester", "January to May","Winter"]];
    const transcriptInfo = ["Transcript","An official digital copy of your transcript will be available to you AFTER your final grades become official..."];
    const secondColumnBlock = [
        ["Housing", "University managed accommodation is available but not guaranteed..."],
        ["Financial Support", "Please go to the Student Awards & Financial Aid website where you can find a summary of each of the funding opportunities with links to the applications."],
        ["Wellness Planning","..."],
        ["Contacts", "The Global Learning Coordinator for Singapore"],
    ];
    const otherInfo = ["Other Info", "For a Fall term exchange NUS Orientation usually begins the 1st of August and classes begin the following week (approx. the 8th of August) so make sure you plan for this.."];
    const costHeaders = ["Costs for one term", "All costs are approximate and in SGD unless otherwise stated"];
    const costInfo = [["Housing", "S$300-1200"], ["Round trip flight", "$1100 CAD"], ["Student fees", "S$130"], ["Books and supplies", "S$200-350"], ["Food", "S$250-500"], ["A cup of coffe", "S$4"]];

    function FacultyBubble(facultyName) {
        const clr = facultyColours.get(facultyName);
    
        return(
          <div style={{padding: 5, background:clr, borderRadius: 5, alignItems:"center"}}>
            {facultyName}
          </div>
        );
    }

    function FacultyInformationRow(faculties = []) {
        return(
            <Grid container spacing = {2} direction="row" item spacing = {2} alignItems="flex-end">
                <Grid item item xs={1.5}>
                    Faculties:
                </Grid>
                {faculties.map((faculty) => (
                    <Grid item>
                        <div>{FacultyBubble(faculty)}</div>
                    </Grid>
                ))}
            </Grid>
        )
    }

    function UniversityInformationColumnItem(row) {
        return(
            <Grid 
                item container direction="row" alignItems="left">
                    <Grid item xs={1.5} sx={{whiteSpace:'pre-wrap'}}>
                        {row[0]}
                    </Grid>
                    <Grid item sx={{whiteSpace:'pre-wrap'}}>
                        {row[1]}
                    </Grid>
            </Grid>
        )
    }

    function UniversityInformationColumn(info) {
        return(
            <div className="UniversityInformation">
                <Grid
                    container spacing = {3}
                    item spacing = {3}
                    direction="column"
                    justifyContent="left"
                    alignItems="left">
                        {info.map((row) => (
                            row[0].toLowerCase() == "faculties" ?
                            FacultyInformationRow(row[1]) : UniversityInformationColumnItem(row)
                        ))}
                </Grid>
            </div>
        )
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
            )
        }
        return tableContent
    }

    function UniversityInformationRow(info, tableHeaders, tableInfo, colWidths) {
        return(
            <Grid
                container spacing = {3}
                item spacing = {3}
                direction="row"
                justifyContent="left"
                alignItems="left"
                paddingTop={3}>
                    <Grid item xs={6}>
                        <div className="UniversityInformation">
                            <Card 
                                variant="outlined"
                                sx={{ height: 250, overflow:'auto'}}>
                                <CardContent sx={{whiteSpace:'pre-wrap'}}>
                                    {`${info[0]}\n\n${info[1]}`}
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <Card 
                            variant="outlined"
                            sx={{ height: 270, overflow:'auto', borderRadius:2,padding:0 }}>
                            <CardContent sx={{whiteSpace:'pre-wrap', padding:0}}>
                                <XchangeTable
                                    headers={tableHeaders}
                                    colWidths={colWidths}
                                    tableBody={TableContent(tableInfo)}
                                    outline={false}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
            </Grid>
        )
    }

    return(
        <div className="UniversityOverviewContent">
            <View style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 10 }}>  
                <div className="UniversityInformationBox">
                    <Grid 
                        container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="left"
                        paddingTop={1}>
                            <div className="Competitiveness" style={{paddingBottom: 15}}>
                                {Competitiveness(competitiveness)}
                            </div>
                            {UniversityInformationColumn(firstColumnBlock)}
                            {UniversityInformationRow(courseInfo, termHeaders, termInfo, ["25%", "30%", "25%"])}
                            <div className="TranscriptInformation">
                                {UniversityInformationColumnItem(transcriptInfo)}
                            </div>
                            {UniversityInformationColumn(secondColumnBlock)}
                            {UniversityInformationRow(otherInfo, costHeaders, costInfo, ["30%", "25%"])}
                    </Grid>
                </div>
            </View>
        </div>
    )
}

export default UniversityOverviewContent;