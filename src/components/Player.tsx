import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { Mesh } from "three";
import { useStore } from "../hooks/useStore";
import * as THREE from "three";

const CHARACTER_SPEED_WALK = 30;
const CHARACTER_SPEED_RUN = 6;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  let { walk, run, fly, jump } = useKeyboard();

  const { camera } = useThree();
  const updateCount = useRef(0);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 100, 0],
  }));

  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });

    //console.log(pos.current);
  }, [api.position]);

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((p) => {
      vel.current = p;
    });
  }, [api.velocity]);

  useFrame(() => {
    const direction = new Vector3(
      0,
      0,
      walk || run ? -(walk ? CHARACTER_SPEED_WALK : CHARACTER_SPEED_RUN) : 0
    );

    direction.applyEuler(camera.rotation);

    camera.position.add(
      new Vector3(
        -camera.position.x + pos.current[0],
        -camera.position.y + pos.current[1],
        -camera.position.z + pos.current[2]
      )
    );

    //camera.position.add(direction);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2]);
    }
    //if (moveBackward || moveForward || moveLeft || moveRight)
    //console.log(pos.current);
  });

  return <mesh ref={ref as React.MutableRefObject<Mesh>} />;
};
