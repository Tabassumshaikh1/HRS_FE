import { Chip } from "@mui/material";
import { IUser } from "../../../interfaces/user.interface";
import { ActivityStatus } from "../../../data/app.constant";
import { IVehicle } from "../../../interfaces/vehicle.interface";

interface IProps {
  info: IUser | IVehicle;
  verient?: "outlined" | "filled";
}

const ActivityStatusChip = ({ info, verient = "outlined" }: IProps) => {
  return (
    <>
      {info.status === ActivityStatus.ACTIVE ? (
        <Chip variant={verient || "outlined"} color="success" size="small" label={info.status} />
      ) : (
        <Chip variant={verient || "outlined"} color="error" size="small" label={info.status} />
      )}
    </>
  );
};

export default ActivityStatusChip;
