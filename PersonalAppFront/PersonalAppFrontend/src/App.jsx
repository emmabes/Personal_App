import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import TicTacToe from "./pages/TicTacToe";
import MenuBar from "./components/MenuBar";
import "./App.css";

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={
          <div className="app-background">
            <ComingSoon />
          </div>
        } />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
