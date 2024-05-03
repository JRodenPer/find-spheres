import { useMemo, useRef } from "react";
import { useConvexPolyhedron } from "@react-three/cannon";
import { CylinderGeometry, Mesh } from "three";
import { Cylinder } from "@react-three/drei";
import { Geometry } from "three-stdlib";
import {
  generateNoiseMap,
  generateTextureFromNoiseMap,
} from "../helper/noiseTextureHelper";
import { House } from "./House";

interface MountainProps {
  position: [number, number, number];
  subPositions: [number, number][];
  radiusTop: number;
  radiusBottom: number;
  height: number;
}

function toConvexProps(bufferGeometry: any) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);

  geo.mergeVertices();
  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ];
}

export const Mountain = ({
  position,
  subPositions = [],
  radiusTop,
  radiusBottom,
  height,
}: MountainProps) => {
  const args: any = useMemo(() => {
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height);
    return toConvexProps(geometry);
  }, [height, radiusBottom, radiusTop]);
  const [ref] = useConvexPolyhedron(
    () => ({ args, mass: 1, position, type: "Static" }),
    useRef<Mesh>(null)
  );

  const noiseMapBorder = generateNoiseMap(
    radiusTop,
    radiusTop,
    radiusTop,
    0,
    0
  );
  const textureBorder = generateTextureFromNoiseMap(
    noiseMapBorder,
    "green",
    "#F2B577",
    true
  );

  const noiseMapTop = generateNoiseMap(512, 512, 100, 0, 0);
  const textureTop = generateTextureFromNoiseMap(noiseMapTop);

  return (
    <mesh receiveShadow castShadow ref={ref as React.MutableRefObject<Mesh>}>
      <Cylinder
        receiveShadow
        castShadow
        args={[radiusTop, radiusBottom, height, 124]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <meshStandardMaterial attach="material" map={textureBorder} />
      </Cylinder>

      <Cylinder
        receiveShadow
        castShadow
        args={[radiusTop - 0.01, radiusTop, 0.1, 124]}
        position={[0, height / 2 + 0.05, 0]}
        rotation={[0, -Math.PI / 4, 0]}
      >
        <meshStandardMaterial attach="material" map={textureTop} />
      </Cylinder>
    </mesh>
  );
};
