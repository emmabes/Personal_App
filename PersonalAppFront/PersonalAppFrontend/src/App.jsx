import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import TicTacToe from "./pages/TicTacToe";
import MemoryGame from "./pages/MemoryGame";
import SnakeGame from "./pages/SnakeGame";
import SudokuGame from "./pages/SudokuGame";
import Resume from "./pages/Resume";
import Scratch from "./pages/Scratch";
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
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route path="/sudoku-game" element={<SudokuGame />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/scratch" element={<Scratch />} />
      </Routes>
    </Router>
  );
}

export default App;
