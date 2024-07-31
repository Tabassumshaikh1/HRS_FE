import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import WindowTwoToneIcon from "@mui/icons-material/WindowTwoTone";
import { Button, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { AppDefaults } from "../../data/app.constant";
import { IVehicleFilters } from "../../interfaces/filter.interface";
import { IListResponse } from "../../interfaces/response.interface";
import { IVehicleType } from "../../interfaces/vehicle-type.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { UtilService } from "../../services/util.service";
import { VehicleTypeService } from "../../services/vehicle-type.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import SearchBox from "../../shared/components/SearchBox";
import VehicleFilters from "./components/VehicleFilters";

const initialValues: any = {
  q: "",
  status: "",
  vehicleType: "",
  page: AppDefaults.PAGE_NO,
  limit: AppDefaults.PAGE_LIMIT,
  sort: AppDefaults.SORT,
  sortBy: AppDefaults.SORT_BY,
};

const Vehicles = () => {
  const notifySvc = new AppNotificationService();
  // const driverSvc = new DriverService();
  const utilSvc = new UtilService();
  const vehicleTypeSvc = new VehicleTypeService();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<IListResponse>({
    total: 0,
    data: [],
  });
  const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showListView, setShowListView] = useState<boolean>(!utilSvc.isMobile());

  const { values, setFieldValue } = useFormik({
    initialValues,

    onSubmit: (values) => {},

    validate: (values: any) => {
      debounced(values);
      return {};
    },
  });

  const debounced = useDebouncedCallback((formData: IVehicleFilters) => {
    loadDrivers(formData);
  }, 500);

  useEffect(() => {
    loadVehicleTypes();
  }, []);

  const loadVehicleTypes = async () => {
    try {
      const response = await vehicleTypeSvc.getVehicleTypes({});
      setVehicleTypes(response.data);
    } catch (error) {
      notifySvc.showError(error);
    }
  };

  useEffect(() => {
    loadDrivers(initialValues as IVehicleFilters);
  }, []);

  const loadDrivers = async (filters: IVehicleFilters) => {
    // try {
    //   filters = { ...filters, page: (filters.page || 0) + 1 };
    //   const response = await driverSvc.getDrivers(filters);
    //   setDrivers(response);
    // } catch (error) {
    //   notifySvc.showError(error);
    // }
  };

  const toggleListAndCardView = async () => {
    if (values.page !== AppDefaults.PAGE_NO) {
      await setFieldValue("page", 0);
    }
    setShowListView(!showListView);
  };

  return (
    <div className="content-wrapper">
      <div className="row my-4">
        <div className="col-12 text-end">
          <Button variant="contained" color="secondary" onClick={() => navigate("/vehicles/new")}>
            <AddTwoToneIcon fontSize="small" className="me-1" /> Add Vehicle
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader title="Vehicles" className="card-heading" />
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6 col-7">
              <SearchBox values={values} setFieldValue={setFieldValue} />
            </div>
            <div className="col-md-6 col-5 text-end">
              {showListView ? (
                <BootstrapTooltip title="Card View" onClick={toggleListAndCardView}>
                  <WindowTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title="List View" onClick={toggleListAndCardView}>
                  <FormatListBulletedTwoToneIcon className="me-3 curson-pointer" />
                </BootstrapTooltip>
              )}
              <BootstrapTooltip title="Download">
                <DownloadTwoToneIcon className="me-3 curson-pointer" />
              </BootstrapTooltip>
              <BootstrapTooltip title="Filters" onClick={() => setShowFilters(!showFilters)}>
                <FilterListTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>
            {showFilters ? (
              <div className="col-12 mt-4">
                <VehicleFilters vehicleTypes={vehicleTypes} values={values} setFieldValue={setFieldValue} />
              </div>
            ) : null}

            <div className="col-12 mt-4">
              {/* {showListView ? (
            <DriverList
              values={values}
              drivers={drivers}
              onDelete={deleteDriver}
              onSortModelChange={sortingModelChange}
              onPaginationModelChange={paginatorModelChange}
            />
          ) : (
            <DriverCards drivers={drivers} values={values} setFieldValue={setFieldValue} onDelete={deleteDriver} />
          )} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vehicles;
