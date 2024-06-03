import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Quaternion, Vector2, Vector3 } from "three";
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

  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 100, 0],
  }));

  const pos = useRef<Vector3>(new Vector3(0, 100, 0));
  const dirQuaternion = useRef<Quaternion>(new Quaternion());

  useEffect(() => {
    const unsubscribe = api.position.subscribe((p) => {
      if (
        p[0] !== pos.current.x ||
        p[1] !== pos.current.y ||
        p[2] !== pos.current.z
      ) {
        pos.current.x = p[0];
        pos.current.y = p[1];
        pos.current.z = p[2];
        if (loading && pos.current.y < 100) setLoading(false);
        setPosition(pos.current);
      }
      if (
        camera.quaternion.x !== dirQuaternion.current.x ||
        camera.quaternion.y !== dirQuaternion.current.y ||
        camera.quaternion.z !== dirQuaternion.current.z ||
        camera.quaternion.w !== dirQuaternion.current.w
      ) {
        dirQuaternion.current.x = camera.quaternion.x;
        dirQuaternion.current.y = camera.quaternion.y;
        dirQuaternion.current.z = camera.quaternion.z;
        dirQuaternion.current.w = camera.quaternion.w;

        const cameraDirection = new Vector3(0, 0, -1);
        cameraDirection.applyQuaternion(camera.quaternion);
        setDirection(new Vector2(cameraDirection.x, cameraDirection.z));
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api.position]);

  const vel = useRef<Vector3>(new Vector3(0, 0, 0));
  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => {
      if (
        v[0] !== vel.current.x ||
        v[1] !== vel.current.y ||
        v[2] !== vel.current.z
      ) {
        vel.current.x = v[0];
        vel.current.y = v[1];
        vel.current.z = v[2];
      }
    });
    return () => unsubscribe();
  }, [api.velocity]);

  useFrame(() => {
    const direction = new Vector3();

    if (walk || walkBack || run) {
      direction.set(
        0,
        0,
        walk || walkBack ? -CHARACTER_SPEED_WALK : -CHARACTER_SPEED_RUN
      );

      if (walkBack) direction.z *= -1;

      direction.applyEuler(camera.rotation);
    }

    const newPosition = new Vector3(
      Math.min(
        Math.max(pos.current.x, -SIZE_GROUND.SIZE_X),
        SIZE_GROUND.SIZE_X
      ),
      pos.current.y,
      Math.min(Math.max(pos.current.z, -SIZE_GROUND.SIZE_Y), SIZE_GROUND.SIZE_Y)
    );

    camera.position.lerp(newPosition, 0.1);

    api.position.set(newPosition.x, newPosition.y, newPosition.z);

    api.velocity.set(direction.x, vel.current.y, direction.z);

    if (jump && Math.abs(vel.current.y) < 0.05) {
      api.velocity.set(vel.current.x, CHARACTER_JUMP_FORCE, vel.current.z);
    }
  });

  return useMemo(() => <mesh ref={ref as React.MutableRefObject<Mesh>} />, []);
};
