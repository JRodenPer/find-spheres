import { DragonBall } from "./DragonBall";
import { useSpheresStore, useMountainsStore } from "../../hooks/useStore";
import { useEffect } from "react";
import { Vector2, Vector3 } from "three";

export const DragonBalls = () => {
  const [spheres] = useSpheresStore((state) => [state.spheres]);
  const [positionsMountain] = useMountainsStore((state) => [
    state.positionsMountain,
  ]);
  const [addSphere] = useSpheresStore((state) => [state.addSphere]);

  useEffect(() => {
    let count = 0;

    positionsMountain?.forEach(
      (item: {
        position: Vector3;
        subPositionsItem: { position: Vector2; isDragonBall: boolean }[];
      }) => {
        item.subPositionsItem?.forEach(
          (subItem: { position: Vector2; isDragonBall: boolean }) => {
            const position = new Vector3(
              subItem.position.x,
              item.position.y * 2 + 0.1,
              subItem.position.y
            );

            if (subItem.isDragonBall) {
              addSphere(position, ++count);
            }
          }
        );
      }
    );
  }, [addSphere, positionsMountain]);

  return (
    <group>
      {spheres.map((sphere) => (
        <DragonBall
          key={sphere.stars}
          position={sphere.pos}
          stars={sphere.stars}
        />
      ))}
    </group>
  );
};
