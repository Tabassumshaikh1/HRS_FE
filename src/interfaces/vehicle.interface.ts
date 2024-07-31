import { ActivityStatus } from "../data/app.constant";
import { IVehicleType } from "./vehicle-type.interface";

export interface IVehicle {
  _id?: string;
  vehicleNumber: string;
  company: string;
  capacity: string;
  mfgYear?: any;
  vehicleType: IVehicleType;
  chassisNumber?: string;
  regNumber?: string;
  imageUrls?: IVehicleImage[];
  status: `${ActivityStatus}`;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IVehicleImage {
  id: string;
  imageUrl: string;
}
