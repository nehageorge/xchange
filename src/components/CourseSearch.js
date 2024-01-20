import "./UniversitySearch.css";
import { View } from "react-native";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import XchangeTable from "./XchangeTable";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import XchangeTabbedHeader from "./XchangeTabbedHeader";
import CoursePageFilters from "./CoursePageFilters";
import { useState, useEffect } from "react";
import AddIcon from "./AddIcon";
import AddEquivalencyButton from "./AddEquivalencyButton";
import AddEquivalencyDialog from "./AddEquivalencyDialog";
import FlashMessage from "react-flash-message";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CourseSearch() {
  const [searchParams, _] = useSearchParams();
  const [courseEquivalencies, setCoursesEquivalency] = useState([]);
  const [allCourseEquivalencies, setAllCoursesEquivalency] = useState([]);
  const [query, setQuery] = useState("");
  const [programFilters, setProgramFilters] = useState([]);
  const [uniFilters, setUniFilters] = useState([]);

  useEffect(() => {
    fetch("/course_equivalencies").then((res) =>
      res.json().then((data) => {
        setCoursesEquivalency(data);
        setAllCoursesEquivalency(data);
      })
    );
  }, []);

  useEffect(() => {
    if (query.length == 0 && uniFilters === [] && programFilters === []) {
      setCoursesEquivalency(allCourseEquivalencies);
      return;
    }

    fetch("/course_equivalencies/search", {
      method: "POST",
      body: JSON.stringify({
        query: query,
        programs: programFilters,
        unis: uniFilters,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      res.json().then((data) => {
        setCoursesEquivalency(data);
      })
    );
  }, [uniFilters, programFilters, query]);

  const search = (newQuery) => {
    setQuery(newQuery);
  };

  function OpenAddEquivalencyDialog() {
    const [open, setOpen] = React.useState(false);
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const updateWindowWidth = () => {
      setWinWidth(window.innerWidth);
    };

    React.useEffect(() => {
      window.addEventListener("resize", updateWindowWidth);
      return () => {
        window.removeEventListener("resize", updateWindowWidth);
      };
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div style={{ paddingBottom: 10 }}>
        {winWidth < 760 ? (
          <div>
            <button
              style={{
                background: "none",
                padding: 0,
                border: "none",
                color: "black",
              }}
              onClick={handleClickOpen}
            >
              <AddIcon />
            </button>
          </div>
        ) : (
          <div>
            <AddEquivalencyButton onClick={handleClickOpen} />
          </div>
        )}
        <AddEquivalencyDialog open={open} onClose={handleClose} />
      </div>
    );
  }

  return (
    <div className="CourseSearch">
      <XchangeTabbedHeader uniActive={false} />
      <View>
        <img
          src={"/matt-ragland-02z1I7gv4ao-unsplash-cropped.jpg"}
          alt="Macbook, bagpack and notes"
          style={{ maxHeight: 400, paddingBottom: "1rem" }}
        ></img>
      </View>
      {searchParams.get("error") && (
        <FlashMessage duration={3000}>
          <center style={{ background: "#ed897e" }}>
            <div style={{ padding: 20 }}>
              <strong>
                Error submitting course equivalency. Ensure all fields are
                populated.
              </strong>
            </div>
          </center>
        </FlashMessage>
      )}
      <div style={{ padding: "1em", marginLeft: "1rem" }}>
        <h2>Search for a Course</h2>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                sx={{ backgroundColor: "rgba(52, 52, 52, 0.1)" }}
                onChange={(event) => {
                  search(event.target.value);
                }}
                name="search"
                label="Search previously approved course equivalents by UW course codes/name "
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { fontSize: 20 } }}
              />
              <br></br>
              <br></br>

              <XchangeTable
                headers={[
                  "UW Course Name",
                  "Host University Course",
                  "Host University",
                  "Year Taken",
                  "Program of Student",
                ]}
                colWidths={["25%", "20%", "25%", "10%", "20%"]}
                numRows={courseEquivalencies.length}
                tableBody={courseEquivalencies.map((ce) => (
                  <TableRow
                    key={ce.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      <Link to={`/uwcourse/${ce.uwcourse.id}`}>
                        {ce.uwcourse.code}: {ce.uwcourse.name}
                      </Link>
                    </TableCell>
                    <TableCell>{ce.code}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      <Link to={`/get_uni/${ce.university.id}/0`}>
                        {ce.university.name}
                      </Link>
                    </TableCell>

                    <TableCell>{ce.year_taken}</TableCell>
                    <TableCell>{ce.student_program}</TableCell>
                  </TableRow>
                ))}
                outline={true}
                // TO-DO Connect to the course endpoint
              />
            </Grid>
            <Grid item xs={3}>
              {OpenAddEquivalencyDialog()}
              <CoursePageFilters
                uniFiltersState={uniFilters}
                setUniFiltersState={setUniFilters}
                programFiltersState={programFilters}
                setProgramFiltersState={setProgramFilters}
              />
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default CourseSearch;
