import React from "react";
import HomePage from "./containers/Homepage";
import ClientContactPage from "./containers/ClientContactPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contactInfo" element={<ClientContactPage />} />
    </Routes>
  );
}

export default App;
