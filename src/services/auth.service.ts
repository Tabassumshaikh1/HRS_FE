import axios from "axios";
import { IGoogleLoginCredentials, ILoginCredentials } from "../interfaces/auth.interface";
import { API_URLS } from "../data/app.constant";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedInUser } from "../redux/slices/loggedInUser.slice";
import { setToken } from "../redux/slices/token.slice";

export class AuthService {
  private appDispatch = useAppDispatch();

  async login(payload: ILoginCredentials) {
    const response = await axios.post(API_URLS.LOGIN, payload);
    this.appDispatch(setLoggedInUser(response.data.user));
    this.appDispatch(setToken(response.data.token));
    return true;
  }

  async loginWithGoogle(payload: IGoogleLoginCredentials) {
    const response = await axios.post(API_URLS.GOOGLE_LOGIN, payload);
    this.appDispatch(setLoggedInUser(response.data.user));
    this.appDispatch(setToken(response.data.token));
    return true;
  }

  async register(payload: FormData) {
    await axios.post(API_URLS.REGISTER, payload);
    return true;
  }
}
