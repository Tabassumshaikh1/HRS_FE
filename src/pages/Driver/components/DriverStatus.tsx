import { Chip } from "@mui/material";
import { ActivityStatus } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  driver: IUser;
}

const DriverStatus = ({ driver }: IProps) => {
  return (
    <>
      {driver.status === ActivityStatus.ACTIVE ? (
        <Chip variant="outlined" color="success" size="small" label={driver.status} />
      ) : (
        <Chip variant="outlined" color="error" size="small" label={driver.status} />
      )}
    </>
  );
};

export default DriverStatus;
