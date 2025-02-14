import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SurvivorList from "./components/SurvivorList";
import Reports from "./components/Reports";
import Navbar from "./navbar/Navbar";
import SurvivoryInventory from "./components/SurvivorInventory";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Reports />} />
        <Route path="/survivor" element={<SurvivorList />} />
        <Route path="/inventory" element={<SurvivoryInventory />} />
      </Routes>
    </div>
  );
};

export default App;
