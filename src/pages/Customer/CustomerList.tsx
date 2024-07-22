import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef, GridSortDirection } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AccountType, ActivityStatus, AppDefaults, DateFormats, SortBy } from "../../data/app.constant";
import { ICustomerFilters } from "../../interfaces/filter.interface";
import { IListResponse } from "../../interfaces/response.interface";
import { IUser } from "../../interfaces/user.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { CustomerService } from "../../services/customer.service";
import { UtilService } from "../../services/util.service";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import CustomerAction from "./components/CustomerAction";
import CustomerContactNo from "./components/CustomerContactNo";
import CustomerCreatedOn from "./components/CustomerCreatedOn";
import CustomerEmail from "./components/CustomerEmail";
import CustomerImage from "./components/CustomerImage";
import CustomerStatus from "./components/CustomerStatus";

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "",
    sortable: false,
    width: 100,
    renderCell: (params) => <CustomerImage customer={{ ...params.row }} />,
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    width: 230,
    renderCell: (params) => <CustomerEmail customer={{ ...params.row }} />,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerContactNo customer={{ ...params.row }} />,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerStatus customer={{ ...params.row }} />,
  },
  {
    field: "createdAt",
    headerName: "Created On",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerCreatedOn customer={{ ...params.row }} />,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 200,
    renderCell: (params) => <CustomerAction customer={{ ...params.row }} />,
  },
];

const initialValues: any = {
  q: "",
  status: "",
  accountType: "",
  page: AppDefaults.PAGE_NO,
  limit: AppDefaults.PAGE_LIMIT,
  sort: AppDefaults.SORT,
  sortBy: AppDefaults.SORT_BY,
};

const CustomerList = () => {
  const [customers, setCustomers] = useState<IListResponse>({
    total: 0,
    data: [],
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const notifySvc = new AppNotificationService();
  const customerSvc = new CustomerService();
  const utilSvc = new UtilService();

  const { values, setFieldValue } = useFormik({
    initialValues,

    onSubmit: (values) => {},

    validate: (values: any) => {
      debounced(values);
      return {};
    },
  });

  const debounced = useDebouncedCallback((formData: ICustomerFilters) => {
    loadCustomers(formData);
  }, 500);

  useEffect(() => {
    loadCustomers(initialValues as ICustomerFilters);
  }, []);

  const loadCustomers = async (filters: ICustomerFilters) => {
    try {
      utilSvc.showLoader();
      filters = { ...filters, page: (filters.page || 0) + 1 };
      const response = await customerSvc.getCustomers(filters);
      setCustomers(response);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };

  const exportCustomers = async () => {
    try {
      utilSvc.showLoader();
      const response = await customerSvc.getCustomers({
        q: values.q,
        status: values.status,
        accountType: values.accountType,
        sort: values.sort,
        sortBy: values.sortBy,
      } as ICustomerFilters);
      const excelData: any[] = [];
      response.data.forEach((customer: IUser, index: number) => {
        excelData.push({
          "S No.": index + 1,
          Name: customer.name,
          Email: customer.email,
          Username: customer.userName,
          "Contact Number": customer.contactNumber,
          Status: customer.status,
          "Account Type": customer.accountType === AccountType.LOCAL ? "HRS Local" : "Google",
          "Created On": utilSvc.formatDate(customer.createdAt),
          "Updated On": utilSvc.formatDate(customer.updatedAt),
        });
      });
      let fileName = "Customers";
      const timestamp = utilSvc.formatDate(new Date(), DateFormats.DD_MM_YYYY_H_MM_A);
      fileName = `${fileName}-${timestamp}`;
      utilSvc.exportAsExcel(excelData, fileName);
    } catch (error) {
      notifySvc.showError(error);
    } finally {
      utilSvc.hideLoader();
    }
  };
  return (
    <div className="content-wrapper">
      <Card>
        <CardHeader title="Customers" className="card-heading"></CardHeader>
        <Divider />
        <CardContent>
          <div className="row">
            <div className="col-md-6 col-9">
              <FormControl variant="outlined">
                <InputLabel size="small" htmlFor="outlined-adornment-search">
                  Search
                </InputLabel>
                <OutlinedInput
                  size="small"
                  name="q"
                  id="outlined-adornment-search"
                  type="search"
                  label="Search"
                  value={values.q}
                  onChange={async (e) => {
                    setFieldValue("q", e.target.value);
                    await setFieldValue("page", 0);
                    await setFieldValue("limit", values.limit);
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-md-6 col-3 text-end">
              <BootstrapTooltip title="Download" onClick={exportCustomers}>
                <DownloadTwoToneIcon className="me-3 curson-pointer" />
              </BootstrapTooltip>
              <BootstrapTooltip title="Filters" onClick={() => setShowFilters(!showFilters)}>
                <FilterListTwoToneIcon className="curson-pointer" />
              </BootstrapTooltip>
            </div>
            {showFilters ? (
              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-md-6 col-6">
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
                        <MenuItem value={ActivityStatus.ACTIVE}>{ActivityStatus.ACTIVE}</MenuItem>
                        <MenuItem value={ActivityStatus.INACTIVE}>{ActivityStatus.INACTIVE}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-6 col-6">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-small-label">Account Type</InputLabel>
                      <Select
                        name="accountType"
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={values.accountType}
                        label="Account Type"
                        onChange={async (e) => {
                          setFieldValue("accountType", e.target.value);
                          await setFieldValue("page", 0);
                          await setFieldValue("limit", values.limit);
                        }}
                      >
                        <MenuItem value="">
                          <em>All</em>
                        </MenuItem>
                        <MenuItem value={AccountType.LOCAL}>HRS Local</MenuItem>
                        <MenuItem value={AccountType.GOOGLE}>Google</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 text-end mt-2">
                    <Button
                      color="inherit"
                      disabled={!values.status && !values.accountType}
                      onClick={async () => {
                        setFieldValue("status", "");
                        setFieldValue("accountType", "");
                        await setFieldValue("page", 0);
                        await setFieldValue("limit", values.limit);
                      }}
                    >
                      <i>Reset Filters</i>
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="col-12 mt-4">
              <DataGrid
                className="data-grid-table"
                rows={customers.data}
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
                paginationMode="server"
                sortingMode="server"
                rowCount={customers.total}
                pageSizeOptions={[5, 10, 25, 50]}
                getRowId={(row) => row._id}
                rowSelection={false}
                disableColumnResize={true}
                paginationModel={{ page: values.page, pageSize: values.limit }}
                rowHeight={50}
                sortModel={[
                  {
                    field: values.sort,
                    sort: values.sortBy as GridSortDirection,
                  },
                ]}
                onPaginationModelChange={async (model) => {
                  if (model.pageSize !== values.limit) {
                    await setFieldValue("page", 0);
                    await setFieldValue("limit", model.pageSize);
                  } else {
                    await setFieldValue("page", model.page);
                    await setFieldValue("limit", model.pageSize);
                  }
                }}
                onSortModelChange={async (model) => {
                  console.log(model);
                  await setFieldValue("sort", model?.[0]?.field || values.sort);
                  await setFieldValue("sortBy", model?.[0]?.sort || SortBy.ASC);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
