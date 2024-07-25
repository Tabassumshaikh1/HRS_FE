import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  driver: IUser;
}

const DriverContactNo = ({ driver }: IProps) => {
  return (
    <>
      <a className="external-link" href={`tel:${driver.contactNumber}`}>
        {driver.contactNumber}
      </a>
    </>
  );
};

export default DriverContactNo;
