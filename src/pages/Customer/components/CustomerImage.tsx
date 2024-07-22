import { Avatar } from "@mui/material";
import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  customer: IUser;
  height?: number;
  width?: number;
}

const CustomerImage = ({ customer, height, width }: IProps) => {
  return (
    <>
      {customer?.imageUrl ? (
        <Avatar alt={customer.name} src={customer.imageUrl} className="mt-1" sx={{ width: height || 40, height: width || 40 }} />
      ) : (
        <Avatar
          alt={customer.name}
          className="mt-1"
          sx={{ width: height || 40, height: width || 40 }}
          src="https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/UI%2Fdefault-profile.png?alt=media&token=11f8d0c2-9d39-4721-a356-c872f6ee64fb"
        />
      )}
    </>
  );
};

export default CustomerImage;
