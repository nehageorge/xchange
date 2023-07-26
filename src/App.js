import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewUni from "./components/ViewUni";
import CourseHome from "./components/CourseHome";
import CoursePage from "./components/CoursePage";
import PreviousCourseSequences from "./components/PrevCourseSequences";
import CourseSearch from "./components/CourseSearch";
import Landing from "./components/Landing";
import UniversitySearch from "./components/UniversitySearch";
import Signup from "./components/Signup";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import Discussion from "./components/Discussion";
import SignupError from "./components/SignupError";
import SignupSuccess from "./components/SignupSuccess";
import LoginError from "./components/LoginError";
import LoginSuccess from "./components/LoginSuccess";
import AddAReview from "./components/AddAReview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login_error" element={<LoginError />} />
          <Route exact path="/login_success" element={<LoginSuccess />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signup_error" element={<SignupError />} />
          <Route exact path="/signup_success" element={<SignupSuccess />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
          <Route exact path="/universities" element={<UniversitySearch />} />
          <Route exact path="/get_uni/:name" element={<ViewUni />} />
          <Route exact path="/course/home" element={<CourseHome />} />
          <Route
            exact
            path="/get_uni/:name/courses/:course_name"
            element={<CoursePage />}
          />
          <Route
            exact
            path="/course/prevSequence"
            element={<PreviousCourseSequences />}
          />
          <Route exact path="/course/search" element={<CourseSearch />} />
          <Route exact path="/review" element={<AddAReview/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
