import { Chip } from "@mui/material";
import { ActivityStatus } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  customer: IUser;
  verient?: "outlined" | "filled";
}

const CustomerStatus = ({ customer, verient = "outlined" }: IProps) => {
  return (
    <>
      {customer.status === ActivityStatus.ACTIVE ? (
        <Chip variant={verient || "outlined"} color="success" size="small" label={customer.status} />
      ) : (
        <Chip variant={verient || "outlined"} color="error" size="small" label={customer.status} />
      )}
    </>
  );
};

export default CustomerStatus;
