import React, { useEffect, useState } from "react";
import {
  useLoadingStore,
  useSpheresStore,
  useTimerStore,
} from "../../hooks/useStore";
import { formatTime } from "../../helper/timerHelper";

export const TimerMenu: React.FC = () => {
  const [time, setTime] = useState(0);
  const [loading] = useLoadingStore((state) => [state.loading]);
  const [win] = useSpheresStore((state) => [state.win]);
  const [setTimer] = useTimerStore((state) => [state.setTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!loading) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  useEffect(() => {
    if (win) setTimer(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTimer, win]);

  return (
    <div hidden={loading} className="timer-menu">
      <p>Time: {formatTime(time)}</p>
    </div>
  );
};
