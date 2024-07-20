import { AccountType, ActivityStatus, SortBy } from "../data/app.constant";

interface CommonFilters {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortBy?: `${SortBy}`;
}

export interface ICustomerFilters extends CommonFilters {
  status?: `${ActivityStatus}`;
  accountType?: `${AccountType}`;
}
