import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from "../redux/hooks";

export class HttpService {
  private token: string = useAppSelector((store) => store.token);

  get(url: string, config: AxiosRequestConfig = {}) {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    return axios.get(url, config);
  }

  post(url: string, payload: any, config: AxiosRequestConfig = {}) {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    return axios.post(url, payload, config);
  }

  put(url: string, payload: any, config: AxiosRequestConfig = {}) {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    return axios.put(url, payload, config);
  }

  patch(url: string, payload: any, config: AxiosRequestConfig = {}) {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    return axios.patch(url, payload, config);
  }

  delete(url: string, config: AxiosRequestConfig = {}) {
    if (this.token) {
      config.headers = { Authorization: `Bearer ${this.token}` };
    }
    return axios.delete(url, config);
  }
}
