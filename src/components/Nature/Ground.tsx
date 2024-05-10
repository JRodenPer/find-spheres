import { Mesh } from "three";
import { usePlane } from "@react-three/cannon";
import { GROUND_POSITION, SIZE_GROUND } from "../../constants";

export function Ground({ texture }: any) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, GROUND_POSITION, 0],
  }));

  return (
    <group>
      {texture ? (
        <mesh receiveShadow ref={ref as React.MutableRefObject<Mesh>}>
          <meshStandardMaterial attach="material" map={texture} />
          <circleGeometry args={[SIZE_GROUND.SIZE_X, 64]} attach="geometry" />
        </mesh>
      ) : null}
    </group>
  );
}
