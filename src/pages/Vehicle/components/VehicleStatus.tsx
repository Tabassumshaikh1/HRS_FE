import { Chip } from "@mui/material";
import { ActivityStatus } from "../../../data/app.constant";
import { IVehicle } from "../../../interfaces/vehicle.interface";

interface IProps {
  vehicle: IVehicle;
  verient?: "outlined" | "filled";
}

const VehicleStatus = ({ vehicle, verient = "outlined" }: IProps) => {
  return (
    <>
      {vehicle.status === ActivityStatus.ACTIVE ? (
        <Chip variant={verient || "outlined"} color="success" size="small" label={vehicle.status} />
      ) : (
        <Chip variant={verient || "outlined"} color="error" size="small" label={vehicle.status} />
      )}
    </>
  );
};

export default VehicleStatus;
