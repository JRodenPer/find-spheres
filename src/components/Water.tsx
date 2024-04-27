import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { SIZE_GROUND } from "../constants";

const { SIZE_X, SIZE_Y } = SIZE_GROUND;

interface WaterProps {
  position: [number, number, number];
  size: [number, number];
}

export const Water = ({ position, size }: WaterProps) => {
  const waterRef = useRef<Mesh>();

  // Función para animar la superficie del agua
  useFrame(({ clock }) => {
    if (waterRef.current) {
      const time = clock.elapsedTime; // Obtiene el tiempo transcurrido
      const vertices = waterRef.current.geometry.attributes.position;

      // Modifica la posición de los vértices del plano según una función sinusoidal
      for (let i = 0; i < vertices.count; i++) {
        // Obtén el índice del vértice
        const index = i * 3;
        // Ajusta el desplazamiento vertical de acuerdo a una función sinusoidal
        vertices.setZ(i, Math.sin(vertices.getX(i) * 0.5 + time) * 0.2);
      }

      // Notifica a Three.js que los vértices han sido modificados
      vertices.needsUpdate = true;
    }
  });

  return (
    <mesh
      ref={waterRef as React.MutableRefObject<Mesh>}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[size[0], size[1] + 2]} />
      <meshStandardMaterial
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.5}
        color="blue"
      />
    </mesh>
  );
};
