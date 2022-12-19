import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ShowDetail from "./ShowDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/:id" element={<ShowDetail />} />
    </Routes>
  );
};

export default Router;
