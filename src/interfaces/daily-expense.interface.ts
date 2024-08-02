import { DailyExpenseStatus } from "../data/app.constant";
import { IUser } from "./user.interface";
import { IVehicle } from "./vehicle.interface";

export interface IDailyExpense {
  _id: string;
  vehicle?: IVehicle;
  date: Date | string;
  expenseOnFuel?: number;
  challan?: number;
  otherExpenses?: number;
  remark?: string;
  status: `${DailyExpenseStatus}`;
  createdBy: IUser;
  updatedBy: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}
