import React, { useEffect, useState } from "react";
import { usePlayerStore, useSpheresStore } from "../../hooks/useStore";

const Radar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [positions, setPositions] = useState<any>([]);
  const [position] = usePlayerStore((state) => [state.position]);
  const [spheres] = useSpheresStore((state) => [state.spheres]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsActive((prevIsActive) => !prevIsActive);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const currentPositions = [
      ...spheres.map((sphere) => {
        return {
          x: Math.round(sphere.pos[0] - position[0] + 250),
          y: Math.round(sphere.pos[2] - position[2] + 250),
        };
      }),
    ];
    setPositions(currentPositions);
  }, [position, spheres]);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "q" || event.key === "Q") setIsVisible(!isVisible);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVisible]);
  return (
    <div className="radar-map-container" hidden={!isVisible}>
      <div className="radar-map">
        <div className="grid-background" />
        <div className="map-container">
          {positions.map((pos: any, index: number) => (
            <div
              key={index}
              className={`marker ${isActive ? "active" : ""}`}
              style={{ top: pos.y + "px", left: pos.x + "px" }}
            />
          ))}
        </div>
        <div className="center-triangle" />
      </div>
    </div>
  );
};

export default Radar;
