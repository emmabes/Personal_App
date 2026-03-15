import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home1 from "./pages/Home1";
import TicTacToe from "./pages/TicTacToe";
import MemoryGame from "./pages/MemoryGame";
import SnakeGame from "./pages/SnakeGame";
import SudokuGame from "./pages/SudokuGame";
import Resume from "./pages/Resume";
import Scratch from "./pages/Scratch";
import Seth from "./pages/Seth";
import AboutMe from "./components/AboutMe/AboutMe3";
import MenuBar from "./components/MenuBar";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/snake-game" element={<SnakeGame />} />
          <Route path="/sudoku-game" element={<SudokuGame />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/scratch" element={<Scratch />} />
          <Route path="/seth" element={<Seth />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
