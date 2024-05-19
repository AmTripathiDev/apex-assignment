import { Vehicle } from "../model/vehicle";

export const VehicleInitialValue = (
  scenerioId: string | undefined,
  allVehicle: Vehicle | null
) => {
  return {
    scenerioList: {
      value: scenerioId ?? "none",
    },
    vehicleName: {
      value: allVehicle ? allVehicle.vehicleName : "",
    },
    vehicleSpeed: {
      value: allVehicle ? allVehicle.speed : "",
    },
    positionX: {
      value: allVehicle ? allVehicle.positionX : "",
    },
    positionY: {
      value: allVehicle ? allVehicle.positionY : "",
    },
    vehicleDirection: {
      value: allVehicle ? allVehicle.direction : "none",
    },
  };
};
