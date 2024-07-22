import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  customer: IUser;
}

const CustomerEmail = ({ customer }: IProps) => {
  return (
    <>
      <a className="external-link" href={`mailto:${customer.email}`}>
        {customer.email}
      </a>
    </>
  );
};

export default CustomerEmail;
