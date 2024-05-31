import React, { useEffect, useState } from "react";
import { useSpheresStore } from "../../hooks/useStore";

export const Winner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [win] = useSpheresStore((state) => [state.win]);

  useEffect(() => {
    setIsVisible(win);
  }, [win]);
  return (
    <div hidden={!isVisible} className="loading-container">
      <div hidden={!isVisible} className="loading">
        <h1>You did it! Press F5 to generate new random scenario...</h1>
        <div className="dragon-balls-loading-container">
          <div className="ball1"></div>
          <div className="ball2"></div>
          <div className="ball3"></div>
          <div className="ball4"></div>
          <div className="ball5"></div>
          <div className="ball6"></div>
          <div className="ball7"></div>
        </div>
      </div>
    </div>
  );
};
