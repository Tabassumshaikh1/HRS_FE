import { Chip } from "@mui/material";
import { ActivityStatus } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  driver: IUser;
  verient?: "outlined" | "filled";
}

const DriverStatus = ({ driver, verient = "outlined" }: IProps) => {
  return (
    <>
      {driver.status === ActivityStatus.ACTIVE ? (
        <Chip variant={verient || "outlined"} color="success" size="small" label={driver.status} />
      ) : (
        <Chip variant={verient || "outlined"} color="error" size="small" label={driver.status} />
      )}
    </>
  );
};

export default DriverStatus;
