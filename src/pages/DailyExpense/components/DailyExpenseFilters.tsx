import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { FormikErrors } from "formik";
import { DailyExpenseStatus } from "../../../data/app.constant";
import { IUser } from "../../../interfaces/user.interface";
import { IVehicle } from "../../../interfaces/vehicle.interface";
import DateRangePickerComp from "../../../shared/components/Common/DateRangePickerComp";

interface IProps {
  vehicles: IVehicle[];
  drivers: IUser[];
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<any>>;
}

const DailyExpenseFilters = ({ vehicles, drivers, values, setFieldValue }: IProps) => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <FormControl fullWidth size="small">
          <InputLabel id="demo-select-small-label">Status</InputLabel>
          <Select
            name="status"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.status}
            label="Status"
            onChange={async (e) => {
              setFieldValue("status", e.target.value);
              await setFieldValue("page", 0);
              await setFieldValue("limit", values.limit);
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={DailyExpenseStatus.PENDING}>{DailyExpenseStatus.PENDING}</MenuItem>
            <MenuItem value={DailyExpenseStatus.APPROVED}>{DailyExpenseStatus.APPROVED}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <FormControl fullWidth size="small">
          <InputLabel id="demo-select-small-label">Vehicle</InputLabel>
          <Select
            name="vehicle"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.vehicle}
            label="Vehicle Type"
            onChange={async (e) => {
              setFieldValue("vehicle", e.target.value);
              await setFieldValue("page", 0);
              await setFieldValue("limit", values.limit);
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle._id} value={vehicle._id}>
                {vehicle.vehicleNumber}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <FormControl fullWidth size="small">
          <InputLabel id="demo-select-small-label">Driver</InputLabel>
          <Select
            name="createdBy"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={values.createdBy}
            label="Driver"
            onChange={async (e) => {
              setFieldValue("createdBy", e.target.value);
              await setFieldValue("page", 0);
              await setFieldValue("limit", values.limit);
            }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {drivers.map((driver) => (
              <MenuItem key={driver._id} value={driver._id}>
                {driver.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
        <DateRangePickerComp values={values} setFieldValue={setFieldValue} maxDate={new Date()} />
      </div>
      <div className="col-12 text-end mt-2">
        <Button
          color="inherit"
          disabled={!values.status && !values.vehicle && !values.createdBy && !values.fromDate && !values.toDate}
          onClick={async () => {
            setFieldValue("status", "");
            setFieldValue("vehicle", "");
            setFieldValue("createdBy", "");
            setFieldValue("fromDate", "");
            setFieldValue("toDate", "");
            await setFieldValue("page", 0);
            await setFieldValue("limit", values.limit);
          }}
        >
          <i>Reset Filters</i>
        </Button>
      </div>
    </div>
  );
};

export default DailyExpenseFilters;
