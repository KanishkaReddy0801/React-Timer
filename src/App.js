import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [timeCount, setTimeCount] = useState(0);
  const [countdown, setCountdown] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const time = Math.floor(parseFloat(event.target.value));
      if (isNaN(time)) {
        setTimeCount(0);
      } else {
        setTimeCount(time);
      }
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (timeCount > 0) {
      if (countdown) clearInterval(countdown);
      setCountdown(setInterval(() => {
        setTimeCount((prevCount) => {
          const newCount = prevCount - 1;
          return newCount < 0 ? 0 : newCount;
        });
      }, 1000));
    }
  }, [timeCount]);

  useEffect(() => {
    if (timeCount === 0 && countdown) {
      clearInterval(countdown);
      setCountdown(null);
    }
  }, [timeCount, countdown]);
  return (
    <div>
      <input id="timeCount" onKeyDown={handleKeyDown} />
      <div id="current-time">{timeCount}</div>
    </div>
  );
}

export default App;
