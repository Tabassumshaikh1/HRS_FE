import DriverDashboard from "../components/DriverDashboard";
import Header from "./Header";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((store: any) => store?.user);
  return (
    <div>
      {user && <Header />}
      <DriverDashboard />
    </div>
  );
};

export default Dashboard;
