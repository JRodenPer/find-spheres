import { HouseSmall } from "./HouseSmall";
import { HouseMid } from "./HouseMid";
import { HouseBig } from "./HouseBig";
import { Vector3 } from "three";

export enum HouseType {
  Small,
  Big,
  Mid,
}

interface HouseProps {
  type: HouseType;
  position: Vector3;
}

export const House = ({ type, position }: HouseProps) => {
  const renderHouse = () => {
    switch (type) {
      case HouseType.Small:
        return <HouseSmall position={position} />;
      case HouseType.Mid:
        return <HouseMid position={position} />;
      case HouseType.Big:
        return <HouseBig position={position} />;
      default:
        return null;
    }
  };

  return <>{renderHouse()}</>;
};
