import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { Mesh } from "three";
import { SIZE_GROUND } from "../constants";

const CHARACTER_SPEED_WALK = 4;
const CHARACTER_SPEED_RUN = 16;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  let { walk, walkBack, run, jump } = useKeyboard();

  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 100, 0],
  }));

  const pos = useRef([0, 100, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
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
      walk || walkBack || run
        ? walk || walkBack
          ? -CHARACTER_SPEED_WALK
          : -CHARACTER_SPEED_RUN
        : 0
    );

    if (walkBack) direction.z *= -1;

    direction.applyEuler(camera.rotation);

    //console.log(pos.current);

    if (pos.current[0] > SIZE_GROUND.SIZE_X) {
      pos.current[0] = SIZE_GROUND.SIZE_X;
      vel.current[0] = 0;
      vel.current[2] = 0;
    }

    if (pos.current[0] < -SIZE_GROUND.SIZE_X) {
      pos.current[0] = -SIZE_GROUND.SIZE_X;
      vel.current[0] = 0;
      vel.current[2] = 0;
    }

    if (pos.current[2] > SIZE_GROUND.SIZE_Y) {
      pos.current[2] = SIZE_GROUND.SIZE_Y;
      vel.current[0] = 0;
      vel.current[2] = 0;
    }

    if (pos.current[2] < -SIZE_GROUND.SIZE_Y) {
      pos.current[2] = -SIZE_GROUND.SIZE_Y;
      vel.current[0] = 0;
      vel.current[2] = 0;
    }

    camera.position.add(
      new Vector3(
        -camera.position.x + pos.current[0],
        -camera.position.y + pos.current[1],
        -camera.position.z + pos.current[2]
      )
    );

    api.position.set(pos.current[0], pos.current[1], pos.current[2]);

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
