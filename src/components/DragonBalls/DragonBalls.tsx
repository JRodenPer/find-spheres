import { nanoid } from "nanoid";
import { DragonBall } from "./DragonBall";
import { useSpheresStore, useMountainsStore } from "../../hooks/useStore";
import { useEffect } from "react";

export const DragonBalls = () => {
  const [spheres] = useSpheresStore((state) => [state.spheres]);
  const [positionsMountain] = useMountainsStore((state) => [
    state.positionsMountain,
  ]);
  const [addSphere] = useSpheresStore((state) => [state.addSphere]);

  useEffect(() => {
    let count = 0;

    positionsMountain?.forEach((item: any) => {
      item.subPositionsItem?.forEach((subItem: any) => {
        const position: [number, number, number] = [
          subItem.position[0],
          item.position[1] * 2 + 0.1,
          subItem.position[1],
        ];

        if (subItem.isDragonBall) {
          addSphere(position, ++count);
        }
      });
    });
  }, [positionsMountain]);

  return (
    <group>
      {spheres.map((sphere) => (
        <DragonBall key={nanoid()} position={sphere.pos} stars={sphere.stars} />
      ))}
    </group>
  );
};
