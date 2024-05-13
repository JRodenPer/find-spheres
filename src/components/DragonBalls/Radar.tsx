import React, { useEffect, useState } from "react";
import { usePlayerStore, useSpheresStore } from "../../hooks/useStore";
import { Vector2, Vector3 } from "three";

const Radar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [positions, setPositions] = useState<any>([]);
  const [position] = usePlayerStore((state) => [state.position]);
  const [direction] = usePlayerStore((state) => [state.direction]);
  const [spheres] = useSpheresStore((state) => [state.spheres]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsActive((prevIsActive) => !prevIsActive);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const normPos2 =
      direction[1] /
      Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1]);

    const cross = new Vector3().crossVectors(
      new Vector3(direction[0], direction[1], 0),
      new Vector3(0, 1, 0)
    );
    const sign = cross.z < 0 ? 1 : -1;
    const angle = sign * Math.acos(-normPos2);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    console.log(angle);
    const currentPositions = [
      ...spheres.map((sphere) => {
        const camPos = new Vector2(
          sphere.pos[0] - position[0],
          sphere.pos[2] - position[2]
        );

        const camPosRot = [
          camPos.x * cos - camPos.y * sin,
          camPos.x * sin + camPos.y * cos,
        ];
        return {
          x: Math.round(camPosRot[0] + 250),
          y: Math.round(camPosRot[1] + 250),
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
