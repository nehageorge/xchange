import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ViewUni from "./components/ViewUni";
import CourseHome from "./components/CourseHome"
import PreviousCourseSequences from "./components/PrevCourseSequences"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/index" element={<Home />} />
          <Route exact path="/get_uni/:name" element={<ViewUni />} />
          <Route exact path="/courseHome" element={<CourseHome />} />
          <Route exact path="/prevCourses" element={<PreviousCourseSequences />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
