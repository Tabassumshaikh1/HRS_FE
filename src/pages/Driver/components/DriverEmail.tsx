import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  driver: IUser;
}

const DriverEmail = ({ driver }: IProps) => {
  return (
    <>
      <a className="external-link" href={`mailto:${driver.email}`}>
        {driver.email}
      </a>
    </>
  );
};

export default DriverEmail;
