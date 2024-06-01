import React, { useEffect, useState } from "react";
import { useLoadingStore } from "../../hooks/useStore";

export const Loading: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [loading] = useLoadingStore((state) => [state.loading]);

  useEffect(() => {
    setIsVisible(loading);
  }, [loading]);
  return (
    <div hidden={!isVisible} className="loading-container">
      <div hidden={!isVisible} className="loading">
        <h1>LOADING...</h1>
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
