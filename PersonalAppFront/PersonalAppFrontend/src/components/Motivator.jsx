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

  const colors = ["yellow", "pink", "blue", "green", "orange", "purple"];

  const showMotivation = () => {
    const randomQuote =
      motivationalQuotes.motivationalQuotes[
        Math.floor(Math.random() * motivationalQuotes.motivationalQuotes.length)
      ];
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
          className={`rainbow-button ${isAnimating ? "animate" : ""}`}
        >
          <div className="rainbow-button-inner">
            <span className="rainbow-button-text">
              Get some love while you're here!
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
