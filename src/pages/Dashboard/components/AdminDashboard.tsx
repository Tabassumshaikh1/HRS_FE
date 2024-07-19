import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <>
      <div>Admin Dashboard</div>
      <Link to={"/customers"}>Customers</Link>
    </>
  );
};

export default AdminDashboard;
