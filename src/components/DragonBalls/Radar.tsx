import React, { useEffect, useMemo, useState } from "react";
import { usePlayerStore, useSpheresStore } from "../../hooks/useStore";
import { Vector2, Vector3 } from "three";

const useRadarData = () => {
  const position = usePlayerStore((state) => state.position);
  const direction = usePlayerStore((state) => state.direction);
  const spheres = useSpheresStore((state) => state.spheres);

  return useMemo(
    () => ({ position, direction, spheres }),
    [position, direction, spheres]
  );
};

const Radar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [positions, setPositions] = useState<Vector2[]>([]);
  const { position, direction, spheres } = useRadarData();
  useEffect(() => {
    const intervalId = isVisible
      ? setInterval(() => {
          setIsActive((prevIsActive) => !prevIsActive);
        }, 1000)
      : null;
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible]);
  useEffect(() => {
    const normPos2 =
      direction.y /
      Math.sqrt(direction.x * direction.x + direction.y * direction.y);

    const cross = new Vector3().crossVectors(
      new Vector3(direction.x, direction.y, 0),
      new Vector3(0, 1, 0)
    );
    const sign = cross.z < 0 ? 1 : -1;
    const angle = sign * Math.acos(-normPos2);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const currentPositions = [
      ...spheres.map((sphere) => {
        const camPos = new Vector2(
          sphere.pos.x - position.x,
          sphere.pos.z - position.z
        );

        const camPosRot = new Vector2(
          camPos.x * cos - camPos.y * sin,
          camPos.x * sin + camPos.y * cos
        );
        const newPos = new Vector2(
          Math.round(camPosRot.x + 250),
          Math.round(camPosRot.y + 250)
        );
        return newPos;
      }),
    ];
    setPositions(currentPositions);
  }, [direction, position, spheres]);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "q" || event.key === "Q") setIsVisible(!isVisible);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isVisible]);

  useEffect(() => {
    const audioElement = document.getElementById("audio") as HTMLAudioElement;
    if (isVisible) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [isVisible]);

  return (
    <div className="radar-map-container" hidden={!isVisible}>
      <audio id="audio" src="/sounds/radarSound.mp3" loop></audio>
      <div className="radar-map">
        <div className="grid-background" />
        <div className="map-container">
          {positions.map((pos: Vector2, index: number) => (
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
