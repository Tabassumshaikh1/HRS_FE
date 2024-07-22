import { IUser } from "../../../interfaces/user.interface";
import { UtilService } from "../../../services/util.service";

interface IProps {
  customer: IUser;
}

const CustomerCreatedOn = ({ customer }: IProps) => {
  return <>{new UtilService().formatDate(customer.createdAt)}</>;
};

export default CustomerCreatedOn;
