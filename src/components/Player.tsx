import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Vector2, Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import { Mesh } from "three";
import { SIZE_GROUND } from "../constants";
import { useLoadingStore, usePlayerStore } from "../hooks/useStore";

const CHARACTER_SPEED_WALK = 4;
const CHARACTER_SPEED_RUN = 16;
const CHARACTER_JUMP_FORCE = 4;

export const Player = () => {
  let { walk, walkBack, run, jump } = useKeyboard();
  const [loading] = useLoadingStore((state) => [state.loading]);
  const [setLoading] = useLoadingStore((state) => [state.setLoading]);
  const [setPosition] = usePlayerStore((state) => [state.setPosition]);
  const [setDirection] = usePlayerStore((state) => [state.setDirection]);

  /*useEffect(() => {
    console.log("El componente Player se ha renderizado");
  });*/

  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 100, 0],
  }));

  const pos = useRef<Vector3>(new Vector3(0, 100, 0));

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current.x = p[0];
      pos.current.y = p[1];
      pos.current.z = p[2];
      if (loading && pos.current.y < 100) setLoading(false);
      setPosition(new Vector3(p[0], p[1], p[2]));
      const cameraDirection = new Vector3(0, 0, -1);
      cameraDirection.applyQuaternion(camera.quaternion);
      setDirection(new Vector2(cameraDirection.x, cameraDirection.z));
    });
  }, [api.position]);

  const vel = useRef<Vector3>(new Vector3(0, 0, 0));
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current.x = v[0];
      vel.current.y = v[1];
      vel.current.z = v[2];
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

    if (pos.current.x > SIZE_GROUND.SIZE_X) {
      pos.current.x = SIZE_GROUND.SIZE_X;
      vel.current.x = 0;
      vel.current.z = 0;
    }

    if (pos.current.x < -SIZE_GROUND.SIZE_X) {
      pos.current.x = -SIZE_GROUND.SIZE_X;
      vel.current.x = 0;
      vel.current.y = 0;
    }

    if (pos.current.z > SIZE_GROUND.SIZE_Y) {
      pos.current.z = SIZE_GROUND.SIZE_Y;
      vel.current.x = 0;
      vel.current.z = 0;
    }

    if (pos.current.z < -SIZE_GROUND.SIZE_Y) {
      pos.current.z = -SIZE_GROUND.SIZE_Y;
      vel.current.x = 0;
      vel.current.z = 0;
    }

    camera.position.add(
      new Vector3(
        -camera.position.x + pos.current.x,
        -camera.position.y + pos.current.y,
        -camera.position.z + pos.current.z
      )
    );

    api.position.set(pos.current.x, pos.current.y, pos.current.z);

    api.velocity.set(direction.x, vel.current.y, direction.z);

    if (jump && Math.abs(vel.current.y) < 0.05) {
      api.velocity.set(vel.current.x, CHARACTER_JUMP_FORCE, vel.current.z);
    }
  });

  return useMemo(() => <mesh ref={ref as React.MutableRefObject<Mesh>} />, []);
};
