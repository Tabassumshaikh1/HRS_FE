import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef, GridPaginationModel, GridSortDirection, GridSortModel } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AccountType, AccountTypeLabel, AppDefaults, AppMessages, DateFormats, PageSizeOptions, SortBy } from "../../data/app.constant";
import { IDriverFilters } from "../../interfaces/filter.interface";
import { IListResponse } from "../../interfaces/response.interface";
import { IUser } from "../../interfaces/user.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { DriverService } from "../../services/driver.service";
import { UtilService } from "../../services/util.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import SearchBox from "../../shared/components/SearchBox";
import DriverAction from "./components/DriverAction";
import DriverContactNo from "./components/DriverContactNo";
import DriverCreatedOn from "./components/DriverCreatedOn";
import DriverFilters from "./components/DriverFilters";
import DriverImage from "./components/DriverImage";
import DriverStatus from "./components/DriverStatus";
import { useNavigate } from "react-router-dom";

const initialValues: any = {
  q: "",
  status: "",
  page: AppDefaults.PAGE_NO,
  limit: AppDefaults.PAGE_LIMIT,
  sort: AppDefaults.SORT,
  sortBy: AppDefaults.SORT_BY,
};

const DriverList = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<IListResponse>({
    total: 0,
    data: [],
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const notifySvc = new AppNotificationService();
  const driverSvc = new DriverService();
  const utilSvc = new UtilService();

  const columns: GridColDef[] = [
    {
      field: "imageUrl",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => <DriverImage imageUrl={params?.row?.imageUrl} />,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      width: 200,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      sortable: true,
      width: 200,
      renderCell: (params) => <DriverContactNo driver={{ ...params.row }} />,
    },
    {
      field: "licenseNumber",
      headerName: "License Number",
      sortable: true,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 200,
      renderCell: (params) => <DriverStatus driver={{ ...params.row }} />,
    },
    {
      field: "createdAt",
      headerName: "Created On",
      sortable: true,
      width: 200,
      renderCell: (params) => <DriverCreatedOn driver={{ ...params.row }} />,
    },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => <DriverAction driver={{ ...params.row }} onDelete={deleteDriver} />,
      headerClassName: "ms-5",
      cellClassName: "ms-2",
    },
  ];

  const { values, setFieldValue } = useFormik({
    initialValues,

    onSubmit: (values) => {},

    validate: (values: any) => {
      debounced(values);
      return {};
    },
  });

  const debounced = useDebouncedCallback((formData: IDriverFilters) => {
    loadDrivers(formData);
  }, 500);

  useEffect(() => {
    loadDrivers(initialValues as IDriverFilters);
  }, []);

  const loadDrivers = async (filters: IDriverFilters) => {
    try {
      utilSvc.showLoader();
      filters = { ...filters, page: (filters.page || 0) + 1 };
      const response = await driverSvc.getDrivers(filters);
      setDrivers(response);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  const exportDrivers = async () => {
    try {
      utilSvc.showLoader();
      const response = await driverSvc.getDrivers({
        q: values.q,
        status: values.status,
        sort: values.sort,
        sortBy: values.sortBy,
      } as IDriverFilters);
      const excelData: any[] = [];
      response.data.forEach((driver: IUser, index: number) => {
        excelData.push({
          "S No.": index + 1,
          Name: driver.name,
          Email: driver.email,
          "License Number": driver?.licenseNumber || "",
          Username: driver.userName,
          "Contact Number": driver.contactNumber,
          Status: driver.status,
          "Account Type": driver.accountType === AccountType.LOCAL ? AccountTypeLabel.LOCAL : AccountTypeLabel.GOOGLE,
          "Created On": utilSvc.formatDate(driver.createdAt),
          "Updated On": utilSvc.formatDate(driver.updatedAt),
        });
      });
      let fileName = "Drivers";
      const timestamp = utilSvc.formatDate(new Date(), DateFormats.DD_MM_YYYY_H_MM_A);
      fileName = `${fileName}-${timestamp}`;
      utilSvc.exportAsExcel(excelData, fileName);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  const deleteDriver = async (id: string) => {
    try {
      utilSvc.showLoader();
      await driverSvc.deleteDriver(id);
      notifySvc.showSucces(AppMessages.DRIVER_DELETED);
      loadDrivers(values);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  const paginatorModelChange = async (model: GridPaginationModel) => {
    if (model.pageSize !== values.limit) {
      await setFieldValue("page", 0);
      await setFieldValue("limit", model.pageSize);
    } else {
      await setFieldValue("page", model.page);
      await setFieldValue("limit", model.pageSize);
    }
  };

  const sortingModelChange = async (model: GridSortModel) => {
    await setFieldValue("sort", model?.[0]?.field || values.sort);
    await setFieldValue("sortBy", model?.[0]?.sort || SortBy.ASC);
  };

  return (
    <div className="content-wrapper">
      <div className="row mb-4">
        <div className="col-12 text-end">
          <Button variant="contained" color="secondary" onClick={() => navigate("/drivers/new")}>
            <AddTwoToneIcon fontSize="small" className="me-1" /> Add Driver
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader title="Drivers" className="card-heading"></CardHeader>
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6 col-9">
              <SearchBox values={values} setFieldValue={setFieldValue} />
            </div>
            <div className="col-md-6 col-3 text-end">
              <BootstrapTooltip title="Download" onClick={exportDrivers}>
                <DownloadTwoToneIcon className="me-4 curson-pointer" />
              </BootstrapTooltip>
              <BootstrapTooltip title="Filters" onClick={() => setShowFilters(!showFilters)}>
                <FilterListTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>
            {showFilters ? (
              <div className="col-12 mt-4">
                <DriverFilters values={values} setFieldValue={setFieldValue} />
              </div>
            ) : null}

            <div className="col-12 mt-4">
              <DataGrid
                className="data-grid-table"
                rows={drivers.data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: values.page, pageSize: values.limit },
                  },
                  sorting: {
                    sortModel: [
                      {
                        field: values.sort,
                        sort: values.sortBy as GridSortDirection,
                      },
                    ],
                  },
                }}
                paginationMode={AppDefaults.PAGINATION_AND_SORTING_MODE}
                sortingMode={AppDefaults.PAGINATION_AND_SORTING_MODE}
                rowCount={drivers.total}
                pageSizeOptions={PageSizeOptions}
                getRowId={(row) => row._id}
                rowSelection={false}
                disableColumnResize={true}
                paginationModel={{ page: values.page, pageSize: values.limit }}
                rowHeight={AppDefaults.LIST_ROW_HEIGHT as number}
                sortModel={[
                  {
                    field: values.sort,
                    sort: values.sortBy as GridSortDirection,
                  },
                ]}
                onPaginationModelChange={paginatorModelChange}
                onSortModelChange={sortingModelChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverList;
