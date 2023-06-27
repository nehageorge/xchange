import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewUni from "./components/ViewUni";
import CourseHome from "./components/CourseHome";
import PreviousCourseSequences from "./components/PrevCourseSequences";
import CourseSearch from "./components/CourseSearch";
import Landing from "./components/Landing";
import UniversitySearch from "./components/UniversitySearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/universities" element={<UniversitySearch />} />
          <Route exact path="/get_uni/:name" element={<ViewUni />} />
          <Route exact path="/course/home" element={<CourseHome />} />
          <Route
            exact
            path="/course/prevSequence"
            element={<PreviousCourseSequences />}
          />
          <Route exact path="/course/search" element={<CourseSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
