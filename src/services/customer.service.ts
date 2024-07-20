import { API_URLS } from "../data/app.constant";
import { ICustomerFilters } from "../interfaces/filter.interface";
import { IListResponse } from "../interfaces/response.interface";
import { HttpService } from "./http.service";
import { UtilService } from "./util.service";

export class CustomerService {
  private httpSvc = new HttpService();
  private utilSvc = new UtilService();

  async getCustomers(filters: ICustomerFilters): Promise<IListResponse> {
    const response = await this.httpSvc.get(API_URLS.CUSTOMERS, {
      params: this.utilSvc.getParams(filters),
    });
    return response.data;
  }
}
