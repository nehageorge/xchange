import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ViewUni from "./components/ViewUni";
import Landing from "./components/Landing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/index" element={<Home />} />
          <Route exact path="/get_uni/:name" element={<ViewUni />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
