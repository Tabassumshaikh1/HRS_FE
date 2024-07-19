import { IGoogleLoginCredentials, ILoginCredentials } from "../interfaces/auth.interface";
import { API_URLS, RouteType, UserRoles } from "../data/app.constant";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeLoggedInUser, setLoggedInUser } from "../redux/slices/loggedInUser.slice";
import { removeToken, setToken } from "../redux/slices/token.slice";
import { HttpService } from "./http.service";
import { IUser } from "../interfaces/user.interface";

export class AuthService {
  private httpSvc = new HttpService();
  private appDispatch = useAppDispatch();
  private loggedInUser: IUser = useAppSelector((store) => store.loggedInUser);
  private token: string = useAppSelector((store) => store.token);

  async login(payload: ILoginCredentials) {
    const response = await this.httpSvc.post(API_URLS.LOGIN, payload);
    this.appDispatch(setLoggedInUser(response.data.user));
    this.appDispatch(setToken(response.data.token));
    return true;
  }

  async loginWithGoogle(payload: IGoogleLoginCredentials) {
    const response = await this.httpSvc.post(API_URLS.GOOGLE_LOGIN, payload);
    this.appDispatch(setLoggedInUser(response.data.user));
    this.appDispatch(setToken(response.data.token));
    return true;
  }

  async register(payload: FormData) {
    await this.httpSvc.post(API_URLS.REGISTER, payload);
    return true;
  }

  async logout() {
    await this.httpSvc.post(API_URLS.LOGOUT, {});
    this.appDispatch(removeLoggedInUser());
    this.appDispatch(removeToken());
    return true;
  }

  canActivateRoute(routeType: `${RouteType}`, roles: `${UserRoles}`[] = []): boolean {
    let canActivate: boolean = false;

    if (routeType === RouteType.PRIVATE) {
      if (roles?.length) {
        canActivate = this.loggedInUser?._id && this.token && roles.includes(this.loggedInUser.role) ? true : false;
      } else {
        canActivate = this.loggedInUser?._id && this.token ? true : false;
      }
    } else {
      canActivate = !this.loggedInUser?._id && !this.token ? true : false;
    }

    return canActivate;
  }
}
