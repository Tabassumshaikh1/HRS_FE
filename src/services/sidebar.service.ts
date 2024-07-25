import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { UserRoles } from "../data/app.constant";
import { ISidebarItem } from "../interfaces/sidebar-item.interface";
import { IUser } from "../interfaces/user.interface";
import { useAppSelector } from "../redux/hooks";

export class SidebarService {
  private loggedInUser: IUser = useAppSelector((store) => store.loggedInUser);

  private items: ISidebarItem[] = [
    {
      name: "Customers",
      path: "/customers",
      iconComp: Groups2TwoToneIcon,
      roles: [UserRoles.ADMIN],
    },
    {
      name: "Drivers",
      path: "/drivers",
      iconComp: Diversity3TwoToneIcon,
      roles: [UserRoles.ADMIN],
    },
  ];

  getSidebarItems(): ISidebarItem[] {
    return [...this.items].filter((item) => item.roles.includes(this.loggedInUser?.role));
  }
}
