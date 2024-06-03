import React, { useEffect, useState } from "react";
import { useSpheresStore, useTimerStore } from "../../hooks/useStore";
import { formatTime } from "../../helper/timerHelper";

export const Winner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [win] = useSpheresStore((state) => [state.win]);
  const [timer] = useTimerStore((state) => [state.timer]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setIsVisible(win);

    const savedTime = Number(localStorage.getItem("timer"));
    if (win) {
      if (!savedTime || (timer > 0 && timer < savedTime)) {
        const message = `You did it! new record: ${formatTime(timer)}!
                         Press F5 to generate new random scenario...`;
        setMsg(message);

        localStorage.setItem("timer", String(timer));
      } else {
        const message = `Good time! you did it in ${formatTime(timer)},
                         but record is ${formatTime(savedTime)} keep trying! 
                         Press F5 to generate new random scenario...`;
        setMsg(message);
      }
    }
  }, [timer, win]);

  return (
    <div hidden={!isVisible} className="loading-container">
      <div hidden={!isVisible} className="loading">
        <h1>{msg}</h1>
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
