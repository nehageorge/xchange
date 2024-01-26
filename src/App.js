import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewUni from "./components/ViewUni";
import CoursePage from "./components/CoursePage";
import CourseSearch from "./components/CourseSearch";
import Landing from "./components/Landing";
import UniversitySearch from "./components/UniversitySearch";
import Signup from "./components/Signup";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import SignupError from "./components/SignupError";
import SignupSuccess from "./components/SignupSuccess";
import LoginError from "./components/LoginError";
import LoginSuccess from "./components/LoginSuccess";
import ForgotPassword from "./components/ForgotPassword";
import ForgotPasswordSuccess from "./components/ForgotPasswordSuccess";

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
          <Route exact path="/forgot_password" element={<ForgotPassword />} />
          <Route
            exact
            path="/forgot_password_success/:token"
            element={<ForgotPasswordSuccess />}
          />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
          <Route exact path="/privacy" element={<PrivacyPolicyPage />} />
          <Route exact path="/universities" element={<UniversitySearch />} />
          <Route exact path="/get_uni/:id/:page" element={<ViewUni />} />
          <Route exact path="/uwcourse/:id" element={<CoursePage />} />
          <Route exact path="/course/search" element={<CourseSearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
