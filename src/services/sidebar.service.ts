import CommuteTwoToneIcon from "@mui/icons-material/CommuteTwoTone";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import { UserRoles } from "../data/app.constant";
import { ISidebarItem } from "../interfaces/sidebar-item.interface";
import { IUser } from "../interfaces/user.interface";
import { useAppSelector } from "../redux/hooks";

export class SidebarService {
  private loggedInUser: IUser = useAppSelector((store) => store.loggedInUser);

  private items: ISidebarItem[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      iconComp: TableChartTwoToneIcon,
      roles: [UserRoles.ADMIN, UserRoles.DRIVER, UserRoles.CUSTOMER],
      isConfigration: false,
    },
    {
      name: "Customers",
      path: "/customers",
      iconComp: Groups2TwoToneIcon,
      roles: [UserRoles.ADMIN],
      isConfigration: false,
    },
    {
      name: "Drivers",
      path: "/drivers",
      iconComp: Diversity3TwoToneIcon,
      roles: [UserRoles.ADMIN],
      isConfigration: false,
    },
    {
      name: "Vehicles",
      path: "/vehicles",
      iconComp: LocalShippingTwoToneIcon,
      roles: [UserRoles.ADMIN],
      isConfigration: false,
    },
    {
      name: "Vehicle Types",
      path: "/vehicle-types",
      iconComp: CommuteTwoToneIcon,
      roles: [UserRoles.ADMIN],
      isConfigration: true,
    },
  ];

  getSidebarItems(): ISidebarItem[] {
    return [...this.items].filter((item) => item.roles.includes(this.loggedInUser?.role));
  }
}
