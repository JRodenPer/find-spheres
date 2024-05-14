import React, { useRef } from "react";
import { Mesh, Texture, Vector2, Vector3 } from "three";

interface WaterProps {
  position: Vector3;
  size: Vector2;
  texture: Texture;
}

export const Water = ({ position, size, texture }: WaterProps) => {
  const waterRef = useRef<Mesh>();

  // Función para animar la superficie del agua
  /*useFrame(({ clock }) => {
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
  });*/

  return (
    <mesh
      ref={waterRef as React.MutableRefObject<Mesh>}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[size.x, size.y]} />
      <meshStandardMaterial
        transparent
        opacity={0.8}
        roughness={0.2}
        metalness={0.5}
        map={texture}
      />
    </mesh>
  );
};
