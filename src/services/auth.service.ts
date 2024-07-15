import { IGoogleLoginCredentials, ILoginCredentials } from "../interfaces/auth.interface";
import { API_URLS } from "../data/app.constant";
import { useAppDispatch } from "../redux/hooks";
import { removeLoggedInUser, setLoggedInUser } from "../redux/slices/loggedInUser.slice";
import { removeToken, setToken } from "../redux/slices/token.slice";
import { HttpService } from "./http.service";

export class AuthService {
  private httpSvc = new HttpService();
  private appDispatch = useAppDispatch();

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
}
