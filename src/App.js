import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import ViewUni from "./components/ViewUni";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/index" element={<Home />} />
          <Route exact path="/new_uni" element={<Add />} />
          <Route exact path="/get_uni/:name" element={<ViewUni />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
