import DriverDashboard from "../components/DriverDashboard";
import { useAppSelector } from "../redux/hooks";
import Header from "./Header";

const Dashboard = () => {
  const user = useAppSelector((store) => store.loggedInUser);
  return (
    <div>
      {user && <Header />}
      <DriverDashboard />
    </div>
  );
};

export default Dashboard;
