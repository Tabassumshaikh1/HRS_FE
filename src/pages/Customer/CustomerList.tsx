import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { DataGrid, GridColDef, GridSortDirection } from "@mui/x-data-grid";
import { IUser } from "../../interfaces/user.interface";
import BootstrapTooltip from "../../shared/components/BootstrapTooltip";
import { AccountType, ActivityStatus, DateFormats, SortBy } from "../../data/app.constant";
import { UtilService } from "../../services/util.service";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDebouncedCallback } from "use-debounce";
import { ICustomerFilters } from "../../interfaces/filter.interface";
import { AppNotificationService } from "../../services/app-notification.service";
import { CustomerService } from "../../services/customer.service";
import { useEffect, useState } from "react";
import { IListResponse } from "../../interfaces/response.interface";

const columns: GridColDef[] = [
  {
    field: "imageUrl",
    headerName: "",
    sortable: false,
    width: 100,
    renderCell: (params) => <CustomerImage {...params} />,
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
    renderCell: (params) => <CustomerEmail {...params} />,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerContactNo {...params} />,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerStatus {...params} />,
  },
  {
    field: "createdAt",
    headerName: "Created On",
    sortable: true,
    width: 200,
    renderCell: (params) => <CustomerCreatedOn {...params} />,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 200,
    renderCell: (params) => <CustomerAction {...params} />,
  },
];

function CustomerImage({ row }: { row: IUser }) {
  return (
    <>
      {row?.imageUrl ? (
        <Avatar alt={row.name} src={row.imageUrl} className="mt-1" />
      ) : (
        <Avatar
          alt={row.name}
          className="mt-1"
          src="https://firebasestorage.googleapis.com/v0/b/hrs-uat.appspot.com/o/UI%2Fdefault-profile.png?alt=media&token=11f8d0c2-9d39-4721-a356-c872f6ee64fb"
        />
      )}
    </>
  );
}

function CustomerEmail({ row }: { row: IUser }) {
  return (
    <>
      <a className="external-link" href={`mailto:${row.email}`}>
        {row.email}
      </a>
    </>
  );
}

function CustomerContactNo({ row }: { row: IUser }) {
  return (
    <>
      <a className="external-link" href={`tel:${row.contactNumber}`}>
        {row.contactNumber}
      </a>
    </>
  );
}

function CustomerStatus({ row }: { row: IUser }) {
  return (
    <>
      {row.status === ActivityStatus.ACTIVE ? (
        <Chip variant="outlined" color="success" size="small" label={row.status} />
      ) : (
        <Chip variant="outlined" color="error" size="small" label={row.status} />
      )}
    </>
  );
}

function CustomerCreatedOn({ row }: { row: IUser }) {
  return <>{new UtilService().formatDate(row.createdAt)}</>;
}

function CustomerAction({ row }: { row: IUser }) {
  const navigate = useNavigate();
  return (
    <>
      <BootstrapTooltip title="Details">
        <IconButton color="primary" onClick={() => navigate(`/customers/${row._id}`)}>
          <VisibilityTwoToneIcon />
        </IconButton>
      </BootstrapTooltip>
    </>
  );
}

const initialValues = {
  q: "",
  status: "",
  page: 0,
  limit: 5,
  sort: "createdAt",
  sortBy: "desc",
  accountType: "",
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
              <BootstrapTooltip title="Filter" onClick={() => setShowFilters(!showFilters)}>
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
