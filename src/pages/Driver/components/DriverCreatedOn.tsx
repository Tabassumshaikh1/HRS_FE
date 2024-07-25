import { IUser } from "../../../interfaces/user.interface";
import { UtilService } from "../../../services/util.service";

interface IProps {
  driver: IUser;
}

const DriverCreatedOn = ({ driver }: IProps) => {
  return <>{new UtilService().formatDate(driver.createdAt)}</>;
};

export default DriverCreatedOn;
