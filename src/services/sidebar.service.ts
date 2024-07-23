import { UserRoles } from "../data/app.constant";
import { ISidebarItem } from "../interfaces/sidebar-item.interface";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
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
  ];

  getSidebarItems(): ISidebarItem[] {
    return [...this.items].filter((item) => item.roles.includes(this.loggedInUser?.role));
  }
}
