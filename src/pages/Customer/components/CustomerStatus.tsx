import { Chip } from "@mui/material";
import { ActivityStatus } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  customer: IUser;
}

const CustomerStatus = ({ customer }: IProps) => {
  return (
    <>
      {customer.status === ActivityStatus.ACTIVE ? (
        <Chip variant="outlined" color="success" size="small" label={customer.status} />
      ) : (
        <Chip variant="outlined" color="error" size="small" label={customer.status} />
      )}
    </>
  );
};

export default CustomerStatus;
