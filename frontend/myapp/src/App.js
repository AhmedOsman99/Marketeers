import "./App.css";
import React from "react";
import { Login } from "./components/Login";
import { Table } from "./components/Table";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/table" element={<Table />} />
        </Routes>
    </div>
  );
}

export default App;
