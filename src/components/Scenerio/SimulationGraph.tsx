import React from "react";
import Vehicle from "../Vehicle/Vehicle";
import "./SimulationGraph.css";

interface VehicleProps {
  id: number;
  direction: "towards" | "downwards" | "backwards" | "upwards";
  positionX: number;
  positionY: number;
  speed: number;
  color: string;
}

interface SimulationGraphProps {
  isActive: boolean;
  vehicles: any[];
}

const SimulationGraph: React.FC<SimulationGraphProps> = ({
  isActive,
  vehicles,
}) => {
  return (
    <div className="simulation-graph">
      {vehicles?.map((vehicle, idx) => {
        let distance;
        let cssPosition: { top?: number; left?: number } = {};

        if (vehicle.direction === "towards") {
          distance = 100 - vehicle.positionX;
          if (isActive) cssPosition.left = 100;
        } else if (vehicle.direction === "downwards") {
          distance = 100 - vehicle.positionY;
          if (isActive) cssPosition.top = 100;
        } else if (vehicle.direction === "backwards") {
          distance = vehicle.positionX;
          if (isActive) cssPosition.left = 0;
        } else {
          distance = vehicle.positionY;
          if (isActive) cssPosition.top = 0;
        }
        const speed = vehicle.speed;
        const time = distance / speed;
        const style = {
          top: `${
            isActive &&
            (vehicle.direction === "downwards" ||
              vehicle.direction === "upwards")
              ? cssPosition.top
              : vehicle.positionY
          }%`,
          left: `${
            isActive &&
            (vehicle.direction === "towards" ||
              vehicle.direction === "backwards")
              ? cssPosition.left
              : vehicle.positionX
          }%`,
          transitionDuration: `${isActive ? time : 0}s`,
          backgroundColor: vehicle.color,
        };
        return (
          <Vehicle key={vehicle.id} serialNumber={idx + 1} cssStyle={style} />
        );
      })}
    </div>
  );
};

export default SimulationGraph;
