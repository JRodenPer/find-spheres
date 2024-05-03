import { ShipCapsule } from "./ShipCapsule";
import { ShipFreezer } from "./ShipFreezer";
import { ShipNamek } from "./ShipNamek";

enum ShipType {
  Namek,
  Capsule,
  Freezer,
}

interface ShipProps {
  type: ShipType;
  position: [number, number, number];
}

export const Ship = ({ type, position }: ShipProps) => {
  const renderHouse = () => {
    switch (type) {
      case ShipType.Namek:
        return <ShipNamek position={position} />;
      case ShipType.Capsule:
        return <ShipCapsule position={position} />;
      case ShipType.Freezer:
        return <ShipFreezer position={position} />;
      default:
        return null;
    }
  };

  return <>{renderHouse()}</>;
};
