import React, { useState } from "react";
import StickyNote from "./StickyNote";
import motivationalQuotes from "../data/quotes.json";
import "../App.css";
import "./Motivator.css";

function Motivator() {
  const [showNote, setShowNote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [noteColor, setNoteColor] = useState("yellow");
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState([]);

  const colors = ["yellow", "pink", "blue", "green", "orange", "purple"];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const showMotivation = () => {
    let currentIndices = [...shuffledIndices];
    
    if (currentIndices.length === 0) {
      // Create a new list of indices and shuffle them
      const allIndices = Array.from(
        { length: motivationalQuotes.motivationalQuotes.length },
        (_, i) => i
      );
      currentIndices = shuffleArray(allIndices);
    }

    // Pop an index from the list
    const nextIndex = currentIndices.pop();
    setShuffledIndices(currentIndices);

    const randomQuote = motivationalQuotes.motivationalQuotes[nextIndex];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setCurrentQuote(randomQuote);
    setNoteColor(randomColor);
    setAnimationKey((prev) => prev + 1);
    setShowNote(true);

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 6000);
  };

  return (
    <>
      <div className="card">
        <button
          onClick={showMotivation}
          className={`rainbow-button motivator-button ${isAnimating ? "animate" : ""}`}
        >
          <div className="rainbow-button-inner">
            <span className="rainbow-button-text">
              Love Button!
            </span>
          </div>
        </button>
      </div>

      <StickyNote
        text={currentQuote}
        color={noteColor}
        show={showNote}
        animationKey={animationKey}
      />
    </>
  );
}

export default Motivator;
