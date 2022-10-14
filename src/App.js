import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import ViewImage from "./components/ViewImage";
import Update from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new_image" element={<Add />} />
          <Route exact path="/get_image/:name" element={<ViewImage />} />
          <Route exact path="/update_image/:name" element={<Update />} />
          <Route exact path="/delete_image/:name" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
