import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { Mesh } from "three";
import { useStore } from "../hooks/useStore";
import * as THREE from "three";

const CHARACTER_SPEED = 4;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  let { moveBackward, moveForward, moveLeft, moveRight, jump } = useKeyboard();

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
    /*camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    );*/

    /*camera.position.add(
      new Vector3(
        -camera.position.x + pos.current[0], // x
        -camera.position.y + pos.current[1], // y
        -camera.position.z + pos.current[2] // z
      )
    );*/

    //if (updateCount.current % 10 === 0) moveLeft = true;
    //if ((updateCount.current - 1) % 10 === 0) moveLeft = false;

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    console.log("useFrame " + moveForward);
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(CHARACTER_SPEED) // walk: 2, run: 5
      .applyEuler(camera.rotation);

    //camera.position.add(direction);

    camera.position.add(
      new Vector3(
        -camera.position.x + pos.current[0], // x
        -camera.position.y + pos.current[1], // y
        -camera.position.z + pos.current[2] // z
      )
    );

    api.velocity.set(
      direction.x,
      vel.current[1], // ???? saltar.
      direction.z
    );

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2]);
    }
    //if (moveBackward || moveForward || moveLeft || moveRight)
    //console.log(pos.current);
  });

  return <mesh ref={ref as React.MutableRefObject<Mesh>} />;
};
