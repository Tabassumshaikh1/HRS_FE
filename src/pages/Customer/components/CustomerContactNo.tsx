import { IUser } from "../../../interfaces/user.interface";

interface IProps {
  customer: IUser;
}

const CustomerContactNo = ({ customer }: IProps) => {
  return (
    <>
      <a className="external-link" href={`tel:${customer.contactNumber}`}>
        {customer.contactNumber}
      </a>
    </>
  );
};

export default CustomerContactNo;
